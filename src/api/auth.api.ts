import request, { type ApiResponse } from "@/api/apiClient";
import type { GoogleLoginPayload } from "@/types/googleLogin";

export const authApi = {
    // Đăng nhập
    login: (data: any): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/login/email",
            data,
            method: "post",
        }),

    //Login with Google
    loginGoogle: (data: GoogleLoginPayload): Promise<ApiResponse<any>> =>
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

    //Verify OTP
    verifyOTP: (data: { otp: string; email?: string }): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/verify-otp",
            data,
            method: "post",
        }),

    //Resend OTP
    resendOTP: (data: { email?: string }): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/auth/resend-otp",
            data,
            method: "post",
        }),
};