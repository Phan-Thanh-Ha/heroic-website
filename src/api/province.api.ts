import apiClient from "@/api/apiClient";

export const getProvinces = async () => {
    try {
        // apiClient đã tự 'bóc vỏ' Axios, nên response ở đây là ApiResponse
        const response = await apiClient.get('/v1/locations/province');
        
        // Trả về toàn bộ object để ở UI có thể dùng response.status hoặc response.message
        return response; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}