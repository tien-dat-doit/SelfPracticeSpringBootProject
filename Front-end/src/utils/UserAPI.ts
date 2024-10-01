import { ListUserResponse } from "../types/AuthType/UserType";
import axiosClient from "./axiosClient";
const UserAPI = {
  getAll: (params: any) => {
    const url = "/users";
    return axiosClient.get<any, ListUserResponse>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
};
export default UserAPI;
