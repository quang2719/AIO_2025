import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/3105_test-git-pro/', // Đặt base cho GitHub Pages, đổi theo tên repo của bạn
})
