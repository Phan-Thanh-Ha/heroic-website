import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true, // Cho phép truy cập từ bên ngoài
    allowedHosts: true, // Cho phép tất cả hosts (chỉ dùng cho dev)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
        '@/api': path.resolve(__dirname, './src/api'),
        '@/assets': path.resolve(__dirname, './src/assets'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/views': path.resolve(__dirname, './src/views'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/provider': path.resolve(__dirname, './src/provider'),
        '@/config': path.resolve(__dirname, './src/config'),
        '@/router': path.resolve(__dirname, './src/router'),
        '@/layouts': path.resolve(__dirname, './src/layouts'),
    },
  },
})
