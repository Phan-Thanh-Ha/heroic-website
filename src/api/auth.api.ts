import request, { type ApiResponse } from "@/api/apiClient";

export const authApi = {
    // Đăng nhập
    login: (data: any): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/login",
            data,
            method: "post",
        }),

    //Login with Google
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a314b7ea1fcbfe063f91e3d0bd34c7663a9710d
};