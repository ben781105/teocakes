import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000, // Set a timeout of 10 seconds
});

export default api;
