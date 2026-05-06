import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use((config) => {
  const loginUser = localStorage.getItem("loginUser");

  if (loginUser) {
    const parsedUser = JSON.parse(loginUser);
    const token = parsedUser.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;
