import { PermissionResponse } from './../types/Permission/PermissionType';

import axiosClient from "./axiosClient";
const RoleAPI = {
  getAll: (params: any) => {
    const url = "/roles";
    return axiosClient.get<any, PermissionResponse>(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  create: (payload: any) => {
    const url = "/permissions";
    return axiosClient.post(url, payload);
  },
  update: (id: string, payload: any) => {
    const url = `/permissions/${id}`;
    return axiosClient.put(url, payload);
  },
  delete: (id: string) => {
    const url = `/permissions/${id}`;
    return axiosClient.delete(url);
  },
};
export default RoleAPI;
