import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("jwtToken");
      toast.error("You have been logged out");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default api;
