import { NoteResponse } from "../types/Note/NoteType";
import axiosClient from "./axiosClient";
const NoteAPI = {
  getAll: (params: any, signal: any) => {
    const url = "/notes";
    return axiosClient.get<any, NoteResponse>(url, {
      params,
      signal,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  create: (payload: any) => {
    const url = `/notes?title=${payload.title}&content=${payload.content}`;
    return axiosClient.post(url, payload.formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  update: (id: string, payload: any) => {
    const url = `/notes/${id}`;
    return axiosClient.put(url, payload);
  },
  delete: (id: string) => {
    const url = `/notes/${id}`;
    return axiosClient.delete(url);
  },
};
export default NoteAPI;
