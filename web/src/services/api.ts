import { type AxiosRequestConfig } from "axios";
import axios from '@/lib/axios';


export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.get<T>(url, config);
    return response.data;
  },

  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axios.post<T>(url, data, config);
    return response.data;
  },

  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axios.put<T>(url, data, config);
    return response.data;
  },

  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axios.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.delete<T>(url, config);
    return response.data;
  },
};