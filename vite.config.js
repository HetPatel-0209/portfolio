import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy disabled to test CORS restrictions
    // proxy: {
    //   '/api': {
    //     target: 'https://portfolio-3y40.onrender.com',
    //     changeOrigin: true,
    //     secure: false,
    //   }
    // }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
