import { notification } from "antd";
import axios from "axios";

type IParams = {
  baseURL: string;
  tokenLocalStorageKey?: string;
};

function createUboxAxiosInstance(params: IParams) {
  const { baseURL, tokenLocalStorageKey } = params;
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(async (config: any) => {
    if (tokenLocalStorageKey) {
      const originConfig = { ...config };
      const apiToken = localStorage.getItem(tokenLocalStorageKey);

      /**
       * Only fill the token if it's available, to solve
       * issue where you can't manualy input the token
       */
      if (apiToken) {
        originConfig.headers.Authorization = `Bearer ${apiToken}`;
      }
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: any) => {
      notification.error({
        message:
          error?.response?.data?.message || error?.message || "Unknown Error!",
      });

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default createUboxAxiosInstance;
