import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
)

export default api;
