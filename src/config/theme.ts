import type { ThemeConfig } from 'antd';
import { colors } from '@/config/colors';

/**
 * Cấu hình theme cho Ant Design
 * Tùy chỉnh màu sắc, font, spacing cho các components
 */
export const themeConfig: ThemeConfig = {
    components: {
        // Button
        Button: {
            colorPrimary: colors.brand.primary,
            colorPrimaryHover: colors.brand.primaryHover,
            colorPrimaryActive: colors.brand.primaryActive,
        },
        Input: {
            colorPrimary: colors.brand.primary,
            colorPrimaryHover: colors.brand.primaryHover,
            colorPrimaryActive: colors.brand.primaryActive,
        },

        /**
         * Menu
         */
        Menu: {
            colorPrimary: colors.brand.primary,
        },
    },
}

