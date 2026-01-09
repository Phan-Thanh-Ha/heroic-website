export interface IProduct {
    id: number
    uuid: string
    code: string
    name: string
    description: string
    image: string
    slug: string
    brandId: number
    originId: number
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    createdById: number
    updatedById: any
    updatedAt: any
    categoryId: number
    productDetails: ProductDetail[]
    productImages: ProductImage[]
}
export interface ProductDetail {
    id: number
    productId: number
    sku: string
    flavor: string
    size: string
    importPrice: number
    retailPrice: number
    discount: number
    quantity: number
    isActive: boolean
    isFlashSale: boolean
    isOutOfStock: boolean
}

export interface ProductImage {
    id: number
    productId: number
    image: string
}