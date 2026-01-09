import { productApi } from "@/api";
import type { IProduct } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

class ProductStore {
    products: IProduct[] = [];
    currentProduct: IProduct | null = null;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Lấy danh sách product
    async fetchProducts(params?: any) {
        try {
            this.setLoading(true);

            const response = await productApi.findAll(params);

            runInAction(() => {
                if (response.success) {
                    this.products = response.data.items || [];
                }
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            throw error;
        }
    }

    // Lấy product by slug
    async fetchProductBySlug(slug: string) {
        try {
            this.setLoading(true);
            const response = await productApi.findBySlug(slug);

            runInAction(() => {
                if (response.success) {
                    this.currentProduct = response.data || null;
                } else {
                    this.currentProduct = null;
                }
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.currentProduct = null;
                this.isLoading = false;
            });
            console.error("Lỗi fetch slug:", error);
        }
    }

    // Set loading
    setLoading(value: boolean) {
        this.isLoading = value;
    }

    // Set products

    setProducts(products: IProduct[]) {
        this.products = products;
    }

    getProducts() {
        return this.products;
    }
}

export const productStore = new ProductStore();