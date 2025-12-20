import apiClient from "@/api/apiClient";

export const getProvinces = async () => {
    try {
        const response = await apiClient.get('/v1/customers/locations/province');
        
        return response; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}