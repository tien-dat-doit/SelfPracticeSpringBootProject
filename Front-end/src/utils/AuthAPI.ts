import { LoginResponse } from "../types/AuthType/LoginResponse";
import axiosClient from "./axiosClient";

const AuthAPI = {
  customerRegistAccount: (payload: any) => {
    const url = "/users";
    return axiosClient.post(url, payload);
  },
  login: (payload: any) => {
    const url = "/auth/token";
    return axiosClient.post<any, LoginResponse>(url, payload);
  },
};
export default AuthAPI;
