import apiClient from "@/api/apiClient";
import type { ApiResponse } from "@/types";

export const orderApi = {
    // Lấy danh sách order
    findAll: (params?: any): Promise<ApiResponse> => {
        return apiClient.get("/v1/customers/order", { params });
    },

    // Lấy chi tiết order theo id
    findById: (id: number): Promise<ApiResponse> => {
        return apiClient.get(`/v1/customers/order/${id}`);
    },

    // Tạo mới order
    create: (data: any): Promise<ApiResponse> => {
        return apiClient.post("/v1/customers/order/create", data);
    },

    // Cập nhật order
    update: (id: number, data: any): Promise<ApiResponse> => {
        return apiClient.patch(`/v1/customers/order/update/${id}`, data);
    },

    // Xóa order
    delete: (id: number): Promise<ApiResponse> => {
        return apiClient.delete(`/v1/customers/order/delete/${id}`);
    }
};