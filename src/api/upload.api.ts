import request, { type ApiResponse } from "@/api/apiClient";

// Định nghĩa kiểu dữ liệu cho Params để gợi ý code tốt hơn


export const uploadApi = {
  // Hàm upload avatar
  // formData: Chứa file ảnh với key 'file'
  uploadAvatar: (formData: FormData): Promise<ApiResponse<any>> => {
    console.log('form data', formData)
    return request({
      url: '/v1/customers/upload/image/single?folder=avatar',
      method: "post",
      data: formData, // Body chứa file
      headers: {
        // Không set Content-Type ở đây, để axios tự động set multipart/form-data với boundary
        // Request interceptor sẽ xử lý việc này
      },
    });
  },
};