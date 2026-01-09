import apiClient from "@/api/apiClient";
import type { ApiResponse } from "@/types";

export const productApi = {
    // Lấy danh sách product
    findAll: (params?: any): Promise<ApiResponse> => {
        return apiClient.get("/v1/customers/product", { params });
    },

    // Lấy chi tiết product theo id
    findById: (id: number): Promise<ApiResponse> => {
        return apiClient.get(`/v1/customers/product/${id}`);
    },

    // Lấy chi tiết product theo slug
    findBySlug: (slug: string): Promise<ApiResponse> => {
        return apiClient.get(`/v1/customers/product/${slug}`);
    },
};