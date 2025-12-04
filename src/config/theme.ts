import type { ThemeConfig } from 'antd'

/**
 * Cấu hình theme cho Ant Design
 * Tùy chỉnh màu sắc, font, spacing cho các components
 */
export const themeConfig: ThemeConfig = {
    components: {
        // Button
        Button: {
            colorPrimary: '#ed1c24',
            colorPrimaryHover: '#ff0000ff',
        },
        Input: {
            colorPrimary: '#ed1c24',
            colorPrimaryHover: '#ff0000ff',
        },
    },
}

