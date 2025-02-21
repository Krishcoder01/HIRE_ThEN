import axios from "axios";

const API_URL = 'https://hire-then.onrender.com/api';
// const API_URL = "http://localhost:3000/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token as Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request, redirecting to login...");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default instance;
