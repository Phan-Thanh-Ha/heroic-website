import { customerStore } from "@/store/customerStore";
import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL;
const NAMESPACE = import.meta.env.VITE_NAMESPACE;

const HTTP_STATUS_MESSAGES: Record<number, string> = {
    400: "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại dữ liệu.",
    401: "Phiên đăng nhập đã hết hạn.",
    403: "Bạn không có quyền truy cập vào tài nguyên này.",
    404: "Không tìm thấy dữ liệu yêu cầu.",
    409: "Dữ liệu đã tồn tại (trùng lặp).",
    422: "Lỗi xác thực dữ liệu.",
    500: "Lỗi hệ thống máy chủ.",
    502: "Bad Gateway.",
    503: "Dịch vụ đang bảo trì.",
};

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// --- REQUEST INTERCEPTOR (GỬI ĐI) ---
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers || {};
        const headers = config.headers as Record<string, any>;

        if (config.data instanceof FormData) {
            delete headers["Content-Type"];
        }

        headers["namespace"] = NAMESPACE;
        headers["x-time-zone"] = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        headers["x-language"] = navigator.language || "vi-VN";

        const token = customerStore.accessToken;
        if (token) {
            headers["x-access-token"] = token; // Bearer token
        }

        // --- LOGGING REQUEST ---
        // Gom nhóm log để console gọn gàng
        console.groupCollapsed(`🚀 REQUEST: ${config.method?.toUpperCase()} ${config.url}`);
        console.log("🔗 URL:", `${config.baseURL}${config.url}`);
        console.log("📦 Body (Data):", config.data);
        console.log("❓ Params (Query):", config.params);
        console.log("🧢 Headers:", headers);
        console.groupEnd();
        // -----------------------

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR (NHẬN VỀ) ---
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // --- LOGGING RESPONSE SUCCESS ---
        console.groupCollapsed(`✅ RESPONSE: ${response.config.url}`);
        console.log("Status:", response.status);
        console.log("📥 Data:", response.data);
        console.groupEnd();
        // --------------------------------

        return response.data;
    },
    (error: AxiosError) => {
        let errorMessage = "Lỗi không xác định";
        let status = 0;

        if (error.response) {
            status = error.response.status;
            const apiData = error.response.data as any;

            errorMessage = apiData?.message;
            if (!errorMessage) {
                errorMessage = HTTP_STATUS_MESSAGES[status] || `Lỗi kết nối (${status})`;
            }

            if (status === 401) {
                const isAuthPage = window.location.pathname.match(/\/(login|register)/);
                if (!isAuthPage) {
                    errorMessage = "Phiên đăng nhập hết hạn.";
                    window.location.href = "/login";
                    // Logic logout...
                }
            }

            if (status >= 500) {
                errorMessage = "Hệ thống đang gặp sự cố. Vui lòng thử lại sau.";
            }

            // --- LOGGING RESPONSE ERROR ---
            console.groupCollapsed(`❌ ERROR RESPONSE: ${error.config?.url}`);
            console.log("Status:", status);
            console.log("Message:", errorMessage);
            console.log("Original Error:", apiData);
            console.groupEnd();
            // ------------------------------

        } else {
            // Lỗi mạng
            if (error.code === "ERR_NETWORK") {
                errorMessage = `Không thể kết nối đến máy chủ.`;
            } else if (error.code === "ECONNABORTED") {
                errorMessage = "Kết nối quá hạn (Timeout).";
            } else {
                errorMessage = error.message;
            }

            console.log(`🔥 NETWORK ERROR:`, errorMessage);
        }

        if (status !== 401) {
            toast.error(errorMessage);
        }

        return Promise.reject({ status, message: errorMessage, originalError: error });
    }
);

export default apiClient;