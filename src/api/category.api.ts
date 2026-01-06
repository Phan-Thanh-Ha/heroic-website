import apiClient from "@/api/apiClient";
import type { ApiResponse } from "@/types";

export const categoryApi = {
    // Lấy danh sách category
    getCategoryList: (params?: any): Promise<ApiResponse> => {
        return apiClient.get("/v1/customers/category", { params });
    },

    // Lấy chi tiết category
    findById: (id: number): Promise<ApiResponse<any>> => {
        return apiClient.get(`/v1/admin/category/${id}`);
    },

    // Tạo mới category
    create: (data: any): Promise<ApiResponse<any>> => {
        return apiClient.post("/v1/admin/category/create", data);
    },

    // Cập nhật category
    update: (uuid: string, data: any): Promise<ApiResponse<any>> => {
        return apiClient.patch(`/v1/admin/category/update/${uuid}`, data);
    },

    // Xóa category
    delete: (uuid: string): Promise<ApiResponse<any>> => {
        return apiClient.delete(`/v1/admin/category/delete/${uuid}`);
    },
};