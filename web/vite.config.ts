import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'

export default defineConfig({
  plugins: [UnoCSS(), vue()],
  server: {
    host: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  optimizeDeps: {
    exclude: ['shiki']
  }
})
