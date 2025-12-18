import request from "@/api/apiClient";
import type { AxiosPromise } from "axios";

export const wardApi = {
  // Lấy danh sách ward
  findAll: (params?: any): AxiosPromise<any> => request({
    url: "/v1//ward",
    params
  }),

  // Tạo mới ward
  create: (data: any): AxiosPromise<any> => request({
    url: "/v1//ward",
    data,
    method: "post"
  }),

  // Cập nhật ward
  update: (id: number, data: any): AxiosPromise<any> => request({
    url: `/v1//ward/${id}`,
    method: "patch",
    data
  }),

  // Xóa ward
  delete: (id: number): AxiosPromise<any> => request({
    url: `/v1//ward/${id}`,
    method: "delete"
  }),

  getWardByDistrictCode: (code: string): AxiosPromise<any> => request({
    url: `v1/customers/locations/wards/${code}`,
    method: "get"
  }),
};