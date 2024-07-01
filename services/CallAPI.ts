import { AxiosInstance } from "axios";
import createUboxAxiosInstance from "./createUboxAxiosInstance";
import { BASE_API_URL } from "../constants/vars";
import { SignInResponse } from "../types/api";

export type CommonQueryParams = {
  onlyCount?: boolean;
  page?: number;
  pageSize?: number;
  attributes?: string;
  includes?: string;
  filtered?: {
    /**
     * It's like `get` lodash
     */
    id: string;
    /**
     * The value that want to filter or search
     */
    value: string | number | boolean | any;
  }[];
};

class BaseCallAPI {
  /**
   * Call the API without token
   */
  public common: AxiosInstance;

  /**
   * Required token to call the API
   */
  public admin: AxiosInstance;

  constructor() {
    this.common = createUboxAxiosInstance({
      baseURL: BASE_API_URL,
    });

    this.admin = createUboxAxiosInstance({
      baseURL: BASE_API_URL,
      tokenLocalStorageKey: "apiToken",
    });
  }

  authLogin(data: { email: string; password: string }) {
    // return this.common.post<SignInResponse>(`/auth/admin/sign-in`, data);
    return this.common.post<SignInResponse>(`/api/v1/login`, data);
  }

  authLogout() {
    return this.admin.post(`/auth/admin/sign-out`);
  }

  authRegister(data: { email: string; password: string }) {
    return this.common.post(`/auth/admin/sign-up`, data);
  }

  getUserProfile() {
    return this.admin.get(`/my-profile`);
  }
}

const CallAPI = new BaseCallAPI();

export default CallAPI;
