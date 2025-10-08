import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:44307/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

console.log("API = ", api)

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Request setup failed!");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.config.method !== "get") {
      toast.success("Operation completed successfully!");
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong!";

    if (status === 401) {
      const alreadyHandled = sessionStorage.getItem("authErrorHandled");
      if (!alreadyHandled) {
        toast.error("Session expired — please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        sessionStorage.setItem("authErrorHandled", "true");
        window.dispatchEvent(new Event("unauthorized"));
      }
    } else if (status === 403) {
      toast.error("Access denied.");
    } else if (status === 404) {
      toast.error("Resource not found.");
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
