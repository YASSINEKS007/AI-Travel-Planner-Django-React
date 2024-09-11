import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.backendHost,
});

export default api;
