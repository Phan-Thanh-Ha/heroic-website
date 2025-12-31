import request from "@/api/apiClient";
import type { ApiResponse } from "@/types";

export const locationApi = {
    // Lấy danh sách province
    getAllProvinces: (): Promise<ApiResponse<any>> =>
        request({
            url: "/v1/customers/locations/province",
            method: "get"
        }),
    
    // Lấy danh sách districts theo province code
    getDistrictsByProvinceCode: (provinceCode: string): Promise<ApiResponse> =>
        request({
            url: `/v1/customers/locations/districts?provinceCode=${provinceCode}`,
            method: "get"
        }),
    
    // Lấy danh sách wards theo district code
    getWardsByDistrictCode: (districtCode: string): Promise<ApiResponse<any>> =>
        request({
            url: `/v1/customers/locations/wards?districtCode=${districtCode}`,
            method: "get"
        })
};

