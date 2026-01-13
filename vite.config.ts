import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Thêm đoạn cấu hình server dưới đây
  server: {
    open: true, // Đảm bảo giá trị này là false
},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/routes': path.resolve(__dirname, './src/routes'),
      '@/views': path.resolve(__dirname, './src/views'),
      '@/api': path.resolve(__dirname, './src/api'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
    },
  },
})