import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
});

api.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/login") && !config.url.includes("/register")) {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401 errors and refreshing token
let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedRequestsQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors
    if (error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Mark request as retrying
        isRefreshing = true; // Prevent multiple refresh attempts

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            // No refresh token available, log out
            logoutUser();
            return Promise.reject(error);
          }

          // Attempt to refresh the token
          const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_HOST}/auth/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const newAccessToken = data.access;
          const newRefreshToken = data.refresh;

          // Store new tokens
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update Authorization header for the original request
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

          // Process any failed requests in the queue
          processQueue(null, newAccessToken);

          return api(originalRequest); // Retry the original request
        } catch (err) {
          // Handle error and log out if refresh fails
          logoutUser();
          return Promise.reject(err);
        } finally {
          isRefreshing = false; // Reset the refresh flag
        }
      } else if (isRefreshing) {
        // If a refresh is in progress, queue the request
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return api(originalRequest); // Retry the original request
        });
      }
    }

    return Promise.reject(error);
  }
);

const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login"; // Redirect to login
};

export default api;
