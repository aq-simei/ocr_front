import axios from "axios";
import { showErrorToast } from "@/components/CustomToast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Full error response:", error.response);
        if (error.response.data.message === "Token has expired") {
          localStorage.removeItem("sessionToken");
          showErrorToast("You have been logged out");
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 2000);
        } else {
          showErrorToast(error.response.data.message || "Unauthorized");
        }
      } else if (error.response.status === 400) {
        showErrorToast(
          error.response.data.message || "Bad Request. Please check your input."
        );
      } else if (error.response.status === 500) {
        showErrorToast("Internal Server Error. Please try again later.");
      }
    } else {
      console.log("Error without response", error);
    }
    return error;
  }
);

export default api;
