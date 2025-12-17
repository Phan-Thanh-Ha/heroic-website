import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { getMessageInstance } from "../util/messageService";

// --- 1. ĐỊNH NGHĨA CẤU TRÚC PHẢN HỒI CHUẨN (NESTJS) ---
// Giúp TypeScript hiểu được cấu trúc { status, code, message, data }
export interface ApiResponse<T = any> {
    status: "success" | "error";
    code: number;
    message: string;
    data: T; // T là kiểu dữ liệu thực tế (ví dụ: { items: [], total: 63 })
}

const BASE_URL = "http://localhost:3102";
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
        const messageApi = getMessageInstance();
        
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
            messageApi?.error({ content: errorMessage, duration: 4 });
            return Promise.reject({ status, message: errorMessage });
        }

        // Lỗi kết nối (Network error)
        const networkError = "Lỗi kết nối, vui lòng kiểm tra internet";
        messageApi?.error({ content: networkError });
        return Promise.reject({ status: 0, message: networkError });
    }
);

export default apiClient;