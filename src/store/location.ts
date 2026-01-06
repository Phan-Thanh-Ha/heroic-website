import { locationApi } from "@/api/location.api";
import type { IDistrict } from "@/types/district.type";
import type { IWard } from "@/types/wards.type";
import { makeAutoObservable, runInAction } from "mobx";

class LocationStore {
    provinceCode: string = "";
    districtCode: string = "";
    wardCode: string = "";

    // Biến cờ để set lại districts khi chọn province mới
    resetDistricts: boolean = false;
    districts: IDistrict[] = [];
    
    // Biến cờ để set lại wards khi chọn district mới
    resetWards: boolean = false;
    wards: IWard[] = [];
    
    constructor() {
        makeAutoObservable(this);
    }

    // Set cờ resetDistricts để trigger reset district
    setResetDistricts(value: boolean) {
        this.resetDistricts = value;
    }

    // Set cờ resetWards để trigger reset ward
    setResetWards(value: boolean) {
        this.resetWards = value;
    }

    // Lấy danh sách districts theo province code
    async getDistrictsByProvinceCode(provinceCode: string) {
        // Set cờ resetDistricts = true và clear districts khi chọn province mới
        runInAction(() => {
            this.setResetDistricts(true);
            this.districts = []; // Clear districts ngay để hiển thị placeholder
        });
        
        const response = await locationApi.getDistrictsByProvinceCode(provinceCode);
        if (response.success) {
            // Wrap các thay đổi observable trong runInAction
            runInAction(() => {
                this.districts = response.data.items || [];
                this.setResetDistricts(false);
            });
        }
    }

    // Lấy danh sách wards theo district code
    async getWardsByDistrictCode(districtCode: string) {
        console.log('districtCode', districtCode)
        runInAction(() => {
            this.setResetWards(true);
            this.wards = [];
        });
        
        const response = await locationApi.getWardsByDistrictCode(districtCode);
        if (response.success) {
            runInAction(() => {
                this.wards = response.data.items || [];
                this.setResetWards(false);
            });
        }
    }
}

export const locationStore = new LocationStore();