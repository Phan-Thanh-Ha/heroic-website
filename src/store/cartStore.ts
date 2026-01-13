import type { IProduct } from "@/types";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class CartStore {

    cartItems: IProduct[] = [];

    constructor() {
        makeAutoObservable(this);
        //Lưu giỏ hàng vào LocalStorage
        makePersistable(this, {
            name: 'cartStore',
            properties: ['cartItems'],
            storage: typeof window !== "undefined" ? window.localStorage : undefined,
        });
    }

    addToCart(product: IProduct) {
        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProduct = this.cartItems.find(item => item.id === product.id);
        // Nếu chưa thì thêm vào giỏ hàng
        if (!existingProduct) {
            this.cartItems.push(product);
        }
    }

    removeFromCart(product: IProduct) {
        this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    }

    //lấy sản phẩm trong giỏ hàng
    getCartItems() {
        return this.cartItems;
    }
    //tổng tiền
    getTotalPrice() {
        return this.cartItems.reduce((total, item) => {
            //tính tổng tiền của sản phẩm giá sau giảm giá nhân cho số lượng
            return total + item.productDetails[0].retailPrice * item.productDetails[0].quantity;
        }, 0);
    }
}

export const cartStore = new CartStore();