import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:7002",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem("token");
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status >= 400) {
      console.log(response.data);
      return Promise.reject(new Error(response.data.message || "Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
