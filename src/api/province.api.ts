import apiClient from "@/api/apiClient";

export const getProvinces = async () => {
    try {
        const response = await apiClient.get('/v1/customers/locations/province')
        console.log('Kiểm tra ', response.data)
        return response.data


    } catch (error) {
        console.error(error);
        throw error;
    }
}