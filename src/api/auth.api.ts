import request from "@/api/apiClient";
import type { AxiosPromise } from "axios";

export const authApi = {
    // Đăng nhập
    login: (data: any): AxiosPromise<any> => request({
        url: "/v1/customer/auth/login",
        data,
        method: "post"
    }),
};