import axios from "axios";

export const publicApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const privateApi = axios.create({
  baseURL: "http://localhost:4000",
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("shutter_token");

  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
