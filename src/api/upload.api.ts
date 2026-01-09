import request from "@/api/apiClient";
import type { ApiResponse } from "@/types";

export const uploadApi = {
  uploadAvatar: (formData: FormData): Promise<ApiResponse<any>> => {
    return request({
      url: '/v1/customers/upload/image/single?folder=avatar',
      method: "post",
      data: formData,
    });
  },
};