import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:7002",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    let sessionUser = localStorage.getItem("sessionUser");
    if (sessionUser) {
      sessionUser = JSON.parse(sessionUser);
      config.headers["Authorization"] = sessionUser.token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("err: " + error);
    if (error.response.status == 401) {
      localStorage.removeItem("sessionUser");
      window.location.href = "/login";
      return Promise.reject(new Error(UNAUTHORIZED));
    }
    return Promise.reject(error.response.data);
  }
);

export default service;

export let UNAUTHORIZED = "Unauthorized";
