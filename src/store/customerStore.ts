import type { ICustomer } from "@/types/customer";
import { makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";


class CustomerStore {

    customers: ICustomer | null = null;
    accessToken: string | null = null;
    loading = false;


    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'customerStore',
            properties: ['customers', 'accessToken'],
            storage: localStorage,
        });
    }

    // Action: set thông tin auth (sau khi login thành công)
    setAuth(data: { customer: ICustomer; token: string }) {
        this.customers = data.customer;
        this.accessToken = data.token;
    }

    // Action: logout, xoá state và dữ liệu persist
    logout() {
        this.customers = null;
        this.accessToken = null;
        clearPersistedStore(this);
    }

    // Action: set trạng thái loading
    setLoading(value: boolean) {
        this.loading = value;
    }

    // Computed: đã đăng nhập hay chưa
    get isAuthenticated() {
        return !!this.accessToken;
    }
    
}

export const customerStore = new CustomerStore();
export const useCustomerStore = () => {
    return customerStore;
}