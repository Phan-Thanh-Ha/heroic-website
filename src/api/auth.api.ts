import request from "@/api/apiClient";
import type { AxiosPromise } from "axios";

export const authApi = {
    // Đăng nhập
    login: (data: any): AxiosPromise<any> => request({
        url: "/v1/customers/auth/login",
        data,
        method: "post"
    }),

    //Login with Google
    loginGoogle: (data: any): AxiosPromise<any> => request({
        url: "/v1/customers/auth/login-with-google",
        data,
        method: "post"
    }),
    Register: (data: any): AxiosPromise<any> => request({
        url: "/v1/customers/auth/register",
        data,
        method: "post"
    }),
};