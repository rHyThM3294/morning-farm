import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: '/morning-farm/',
  plugins: [vue()],
  server: { port: 5173 },
  preview: { port: 5174 },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})

