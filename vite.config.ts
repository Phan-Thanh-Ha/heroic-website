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
    },
  },
})
