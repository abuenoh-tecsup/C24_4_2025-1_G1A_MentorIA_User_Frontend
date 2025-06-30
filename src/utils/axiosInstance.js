import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Interceptor para agregar token a todas las peticiones
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;