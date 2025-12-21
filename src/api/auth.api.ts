import request, { type ApiResponse } from "@/api/apiClient";

export const authApi = {
    // Đăng nhập
    login: (data: any): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/login/email",
            data,
            method: "post",
        }),

    //Login with Google
    loginGoogle: (data: any): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/login/google",
            data,
            method: "post",
        }),

    //Login with Facebook
    loginFacebook: (data: any): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/login/facebook",
            data,
            method: "post",
        }),

    //Register
    register: (data: any): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/register/email",
            data,
            method: "post",
        }),
};