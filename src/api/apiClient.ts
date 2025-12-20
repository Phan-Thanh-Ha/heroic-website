import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";


export interface ApiResponse<T = any> {
    status: string
    code: number
    success: boolean
    message: string
    data: T
}

const BASE_URL = "http://192.168.2.3:3102";
const NAMESPACE = "heroic-shop";

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000, // Giảm xuống 15s cho hợp lý
    headers: {
        "Content-Type": "application/json",
    },
});

// --- 2. REQUEST INTERCEPTOR ---
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers.set("namespace", NAMESPACE);
        // Truyền timeZone từ trình duyệt
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        config.headers.set("x-timezone", timeZone);

        // Truyền ngôn ngữ từ trình duyệt
        const language = navigator.language || "vi-VN";
        config.headers.set("x-language", language);
        
        // Lấy token thật từ localStorage
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.set("token", token);
        } else {
            // Tạm thời để test như bạn muốn, nhưng nên dùng token thật
            config.headers.set("token", "1"); 
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// --- 3. MAPPING THÔNG BÁO LỖI ---
const ERROR_MESSAGES: Record<number, string> = {
    400: "Yêu cầu không hợp lệ",
    401: "Phiên đăng nhập hết hạn",
    403: "Bạn không có quyền truy cập",
    404: "Không tìm thấy tài nguyên",
    500: "Lỗi máy chủ, vui lòng thử lại sau",
};

// --- 4. RESPONSE INTERCEPTOR (BÓC VỎ DỮ LIỆU) ---
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // QUAN TRỌNG: Trả về response.data để bỏ lớp vỏ của Axios
        // Bây giờ kết quả trả về sẽ là object ApiResponse { status, code, data... }
        return response.data;
    },
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            const apiData = error.response.data as any;
            
            // Lấy message từ server trả về, nếu không có thì dùng map ở trên
            const errorMessage = apiData?.message || ERROR_MESSAGES[status] || "Lỗi không xác định";

            // Xử lý riêng lỗi 401 (Unauthorized)
            if (status === 401) {
                const isAuthPage = window.location.pathname.match(/\/(login|register)/);
                if (!isAuthPage) {
                    // Tùy chọn: Xóa token và redirect về trang chủ/login
                    // localStorage.removeItem("accessToken");
                    const isProfilePage = window.location.pathname.match(/\/(tai-khoan|orders)/);
                    if (isProfilePage) {
                        window.location.href = "/";
                    }
                }
                return Promise.reject({ status: 401, message: errorMessage });
            }

            // Hiển thị thông báo lỗi cho các trường hợp khác
            toast.error(errorMessage, { duration: 4000 });
            return Promise.reject({ status, message: errorMessage });
        }

        // Lỗi kết nối (Network error)
        const networkError = "Lỗi kết nối, vui lòng kiểm tra internet";
        toast.error(networkError);
        return Promise.reject({ status: 0, message: networkError });
    }
);

export default apiClient;