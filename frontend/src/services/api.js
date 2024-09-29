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


// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_HOST,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     if (!config.url.includes("/login") && !config.url.includes("/register")) {
//       const token = localStorage.getItem("token");

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for handling 401 errors and refreshing token
// let isRefreshing = false;
// let failedRequestsQueue = [];

// const processQueue = (error, token = null) => {
//   failedRequestsQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedRequestsQueue = [];
// };

// api.interceptors.response.use(
//   (response) => {
//     return response; // Pass through successful responses
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       // Prevent retrying the same request multiple times
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedRequestsQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem("refresh");
//         if (!refreshToken) {
//           return Promise.reject(error); // If no refresh token, reject the promise
//         }

//         // Refresh token logic (replace with your refresh token API call)
//         const { data } = await axios.post(
//           `${import.meta.env.VITE_BACKEND_HOST}/auth/refresh-token`,
//           {
//             refresh_token: refreshToken,
//           }
//         );

//         const newAccessToken = data.accessToken;

//         // Save new access and refresh tokens
//         localStorage.setItem("access", newAccessToken);
//         // localStorage.setItem("refresh", data.refreshToken);  // Update refresh token if provided

//         // Update Authorization header for the failed request and retry it
//         api.defaults.headers["Authorization"] = "Bearer " + newAccessToken;
//         originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

//         processQueue(null, newAccessToken);

//         return api(originalRequest); // Retry the original request with new token
//       } catch (err) {
//         processQueue(err, null);
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;