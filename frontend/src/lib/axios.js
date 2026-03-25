import axios from "axios";

const configuredApiBaseUrl = (import.meta.env.VITE_API_URL || "").trim();

export const axiosInstance = axios.create({
  baseURL:
    configuredApiBaseUrl ||
    (import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api"),
  withCredentials: true,
});
