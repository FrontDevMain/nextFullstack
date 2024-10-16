import axios from "axios";
import { message } from "antd"; // Optional, used for user-friendly notifications

// Create a new instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  // "https://next-fullstack-pv7ses7fc-frontdevmains-projects.vercel.app" ||
  timeout: 20000, // Increase timeout for handling large data
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add tokens or any headers before the request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any token, if needed (e.g., from cookies or local storage)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.code == 400) {
      message.error(response.data.message);
    }
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    if (status) {
      if (status === 401) {
        message.error(error.message);
      } else if (status === 404) {
        message.error(error.message);
      } else {
        message.error(error.message);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
