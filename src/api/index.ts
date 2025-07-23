import axios from "axios";
import { clearStorage, getItem } from "@helpers";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api",
});

axiosInstance.interceptors.request.use((config) => {
  const access_token = getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
      clearStorage();
    }
  }
);

export default axiosInstance;
