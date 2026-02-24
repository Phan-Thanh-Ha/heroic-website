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
    updatedById: number
    updatedAt: string
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
    discountedPrice: number
}

export interface ProductImage {
    id: number
    productId: number
    image: string
}

export interface IProductQueryParams {
    page?: number;
    limit?: number;
    name?: string;
    category?: string;
    [key: string]: any;
}