import request from "@/api/apiClient";
import type { AxiosPromise } from "axios";

export const districtApi = {
  // Lấy danh sách district
  findAll: (params?: any): AxiosPromise<any> => request({
    url: "/v1//district",
    params
  }),

  // Tạo mới district
  create: (data: any): AxiosPromise<any> => request({
    url: "/v1//district",
    data,
    method: "post"
  }),

  // Cập nhật district
  update: (id: number, data: any): AxiosPromise<any> => request({
    url: `/v1//district/${id}`,
    method: "patch",
    data
  }),

  // Xóa district
  delete: (id: number): AxiosPromise<any> => request({
    url: `/v1//district/${id}`,
    method: "delete"
  }),

  getDistrictByProvinceCode: (code: string): AxiosPromise<any> => request({
    url: `/v1/customers/locations/districts/${code}`,
    method: "get"
  }),
}