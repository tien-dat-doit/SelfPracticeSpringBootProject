import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/identity",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const userDataJson = localStorage.getItem("userData");
    const userData = userDataJson ? JSON.parse(userDataJson) : "";
    if (userData?.accessToken) {
      config.headers["Authorization"] = `Bearer ${userData.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
     //handle error 401 here
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
