import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6173,
    strictPort: true,
  },
  preview: {
    port: 6174,
    strictPort: true,
  },
})
