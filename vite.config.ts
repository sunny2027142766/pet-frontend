/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:22:13
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 16:39:32
 * @FilePath: \pet-frontend\vite.config.ts
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  // server config
  server: {
    host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    port: 8000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
