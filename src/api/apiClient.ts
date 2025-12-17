import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { getMessageInstance } from "../util/messageService";

const BASE_URL = "http://192.168.2.3:3102";
const NAMESPACE = "heroic-shop";

// 1. Đổi tên thành apiClient
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. Cấu hình Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers.set("namespace", NAMESPACE);
        const token = localStorage.getItem("accessToken");
        // if (token) {
            config.headers.set("token", `${1}`);
        // }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// 3. Mapping thông báo lỗi để rút gọn Switch-case
const ERROR_MESSAGES: Record<number, string> = {
    400: "Yêu cầu không hợp lệ",
    403: "Bạn không có quyền truy cập",
    404: "Không tìm thấy tài nguyên",
    500: "Lỗi máy chủ, thử lại sau",
};

// 4. Cấu hình Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const messageApi = getMessageInstance();
        
        if (error.response) {
            const status = error.response.status;
            const apiMessage = (error.response.data as { message?: string })?.message;
            const errorMessage = apiMessage || ERROR_MESSAGES[status] || "Lỗi không xác định";

            // Xử lý riêng 401 (Auth)
            if (status === 401) {
                const isAuthPage = window.location.pathname.match(/\/(login|register)/);
                
                if (!isAuthPage) {
                    // localStorage.removeItem("accessToken");
                    // runInAction(() => {
                    //     authStore.user = null;
                    //     authStore.isAuthenticated = false;
                    // });

                    const isProfilePage = window.location.pathname.match(/\/(tai-khoan|orders)/);
                    if (!isProfilePage) {
                        window.location.href = "/";
                    }
                }
                return Promise.reject({ status: 401, message: errorMessage });
            }

            // Xử lý các lỗi khác (400, 403, 404, 500)
            messageApi?.error({ content: errorMessage, duration: 4 });
            return Promise.reject({ status, message: errorMessage });
        }

        // Lỗi kết nối (Network error)
        const networkError = error.request ? "Lỗi mạng, vui lòng kiểm tra internet" : error.message;
        messageApi?.error({ content: networkError });
        return Promise.reject({ status: error.request ? 0 : -1, message: networkError });
    }
);

export default apiClient;