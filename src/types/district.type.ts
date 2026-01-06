export interface IDistrict {
    id: number
    code: string
    name: string
    slug: string
    type: string
    name_with_type: string
    path: string
    path_with_type: string
    province_code: string
}

export interface IDistrictResponse {
    result: IDistrict[]
}