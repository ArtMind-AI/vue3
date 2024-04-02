import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  assetsInclude: ["**/*.html"],
  resolve: {
    alias: {
      '@': '/src', // 将 @ 设置为指向 /src 目录
    },
  },
})
