import type { IProduct } from "@/types";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class CartStore {
    cartItems: IProduct[] = [];

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: 'cartStore',
            properties: ['cartItems'],
            storage: typeof window !== "undefined" ? window.localStorage : undefined,
        });
    }

    addToCart(product: IProduct) {
        const existingProduct = this.cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            // Nếu có rồi thì tăng số lượng lên 1
            existingProduct.productDetails[0].quantity += 1;
        } else {
            // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
            this.cartItems.push({ ...product });
        }
    }

    removeFromCart(id: number) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
    }

    // Tính tổng tiền của giỏ hàng
    get totalPrice() {
        let total = 0;
        this.cartItems.forEach(item => {
            item.productDetails.forEach(detail => {
                total += (detail.retailPrice * detail.quantity);
            });
        });
        return total;
    }

    // Lấy tổng số lượng sản phẩm trong giỏ hàng
    get cartCount() {
        return this.cartItems.length;
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItemQuantity(id: number, quantity: number) {
        const existingProduct = this.cartItems.find(item => item.id === id);
        if (existingProduct && quantity > 0) {
            existingProduct.productDetails[0].quantity = quantity;
        }
    }

    clearCart() {
        this.cartItems = [];
    }
}

export const cartStore = new CartStore();