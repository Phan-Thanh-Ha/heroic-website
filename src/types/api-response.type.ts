// 1. Cấu trúc bao bọc (Wrapper) dùng chung cho mọi API
export interface ApiResponse<T = any> {
    status: string;
    code: number;
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    totalPage: number;
    currentPage: number;
    limit: number;
}