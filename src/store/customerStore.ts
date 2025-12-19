import type { ICustomer } from "@/types/customer";
import { makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import { googleLogout } from "@react-oauth/google";

// Định nghĩa các hằng số để tránh typo
const PROVIDER = {
    GOOGLE: "GOOGLE",
    FACEBOOK: "FACEBOOK",
    FORM: "FORM"
} as const;

const facebookLogout = () => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (w.FB?.logout) {
        w.FB.logout();
    }
};

class CustomerStore {
    customers: ICustomer | null = null;
    accessToken: string | null = null;
    loginProvider: string | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'customerStore',
            properties: ['customers', 'accessToken', 'loginProvider'], // Cần persist cả provider để logout đúng sau khi F5
            storage: typeof window !== "undefined" ? window.localStorage : undefined,
        });
    }

    setAuth(data: { customer: ICustomer; token: string }) {
        console.log('setAuth', data);
        this.customers = data.customer;
        this.accessToken = data.token;
        // Chuẩn hoá provider về Uppercase để so sánh chính xác
        this.loginProvider = data.customer.typeRegister?.toUpperCase() ?? null;
    }

    logout() {
        const providerActions: Record<string, () => void> = {
            [PROVIDER.GOOGLE]: () => googleLogout(),
            [PROVIDER.FACEBOOK]: () => facebookLogout(),
            [PROVIDER.FORM]: () => {} // Với form, clearPersistedStore đã lo phần xoá storage
        };

        try {
            // Thực thi logout tương ứng với provider hiện tại
            if (this.loginProvider) {
                providerActions[this.loginProvider]?.();
            }
        } catch (error) {
            console.error(`Logout Error (${this.loginProvider}):`, error);
        } finally {
            // Reset toàn bộ state về mặc định
            this.customers = null;
            this.accessToken = null;
            this.loginProvider = null;
            
            // Xoá dữ liệu đã lưu trong LocalStorage
            clearPersistedStore(this);
        }
    }

    setLoading(value: boolean) {
        this.loading = value;
    }

    get isAuthenticated() {
        return !!this.accessToken;
    }
}

export const customerStore = new CustomerStore();
export const useCustomerStore = () => customerStore;