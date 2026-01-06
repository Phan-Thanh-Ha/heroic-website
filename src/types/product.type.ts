export interface IProduct {
    id: number
    uuid: string
    code: string
    name: string
    description: string
    image: string
    slug: string
    importPrice: number
    retailPrice: number
    discount: number
    quantity: number
    isActive: boolean
    isDeleted: boolean
    isOutOfStock: boolean
    isFlashSale: boolean
    createdAt: string
    createdById: number
    updatedById: any
    updatedAt?: string
    categoryId: number
}