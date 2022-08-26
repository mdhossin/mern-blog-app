import axiosClient from "./axiosClient";

const authApi = {
  register: (data) => axiosClient.post("/auth/signup", data),
  login: (data) => axiosClient.post("/auth/login", data),
};

export default authApi;
