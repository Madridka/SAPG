import axios from "axios";
import { useStore } from "@/store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_baseURL,
});

api.interceptors.request.use((config) => {
  const store = useStore();
  const token = store.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status > 500) {
      console.error("error");
    }

    return Promise.reject(error);
  }
);

export default api;
