import { uploadImageApi } from "@/api/uploadImage.api";
import { TypeUpload, UploadFolderType } from "@/enum";
import { toast } from "sonner";

export const apiUploadImage = async (
    file: any, 
    folder: UploadFolderType,
) => {
    try {
        const actualFile = file instanceof File ? file : file?.originFileObj;
        if (!actualFile) return null;

        const response = await uploadImageApi.upload(actualFile, TypeUpload.Admin, folder); 
        
        if (response && response.data.url) {
            return response; // Trả về { url: '...', success: true, ... }
        }
    } catch (error: any) {
        console.error("Upload Helper Error:", error);
        toast.error("Tải ảnh lên thất bại");
    }
    return null;
};