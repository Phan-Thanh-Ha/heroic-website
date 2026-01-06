import type { IProduct } from "./product.type"

export interface ICategory {
    id: number
    uuid: string
    name: string
    slug: string
    banner: string
    thumbnail: string
    description: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    createdById: number
    updatedAt: string
    updatedById?: number
    products: IProduct[]
}