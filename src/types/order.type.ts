import type { IProduct } from "./product.type"

export interface IOrder {
    paymentMethod: string
    cartItems: IProduct[]
    subTotal: number
    totalDiscount: number
    totalAmount: number
    shippingFee: number
    discountCode: string
}