export const generateSlug = (text: string): string => {
    if (!text) return "";
    return text
        .toLowerCase()
        .normalize("NFD")                  // Chuyển về dạng tổ hợp để tách dấu
        .replace(/[\u0300-\u036f]/g, "")   // Xóa các dấu sau khi đã tách
        .replace(/[đĐ]/g, "d")             // Xử lý riêng chữ đ
        .replace(/([^0-9a-z-\s])/g, "")    // Xóa ký tự đặc biệt
        .replace(/(\s+)/g, "-")            // Thay khoảng trắng bằng dấu -
        .replace(/-+/g, "-")               // Xóa dấu - thừa (ví dụ: -- thành -)
        .replace(/^-+|-+$/g, "");          // Xóa dấu - ở đầu và cuối chuỗi
};