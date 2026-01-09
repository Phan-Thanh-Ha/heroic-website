/**
 * Định dạng số thành chuỗi tiền tệ (Ví dụ: 100000 -> 100.000 ₫)
 * @param amount - Số tiền cần định dạng
 * @param currency - Loại tiền tệ (mặc định là VND)
 * @param locale - Ngôn ngữ hiển thị (mặc định là vi-VN)
 */
export const formatCurrency = (
    amount: number | string | undefined | null,
    currency: string = 'VND',
    locale: string = 'vi-VN'
): string => {
    if (amount === undefined || amount === null || amount === '') return '0 ₫';

    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) return '0 ₫';

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(numericAmount);
};

export const formatterVND = (value: number) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const parserVND = (value: string) => {
    return value.replace(/\$\s?|(\.*)/g, '');
};