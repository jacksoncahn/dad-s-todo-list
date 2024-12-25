import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      // 'Cross-Origin-Embedder-Policy': 'require-corp',
      // 'Cross-Origin-Resource-Policy': 'cross-origin',
    }
  }
})