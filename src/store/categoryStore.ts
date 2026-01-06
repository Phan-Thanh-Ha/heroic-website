import { categoryApi } from "@/api/category.api";
import type { ICategory } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

class CategoryStore {
    categories: ICategory[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Lấy danh sách category
    async getCategoryList() {
        try {
            this.setLoading(true);
            
            const response = await categoryApi.getCategoryList();
            
            runInAction(() => {
                if (response.success) {
                    this.categories = response.data.items || [];
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

    // Set loading
    setLoading(value: boolean) { 
        this.isLoading = value;
    }
}

export const categoryStore = new CategoryStore();