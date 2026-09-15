import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
//
// One repo checkout serves both staging and production from the same VM, so
// each build mode writes to its OWN output folder — otherwise a staging
// rebuild would silently overwrite the production site's files (and vice
// versa) since both would land in the default dist/.
//   npm run build              -> dist/            (production, default mode)
//   npm run build -- --mode staging -> dist-staging/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 6173,
    strictPort: true,
  },
  preview: {
    port: 6174,
    strictPort: true,
  },
  build: {
    outDir: mode === 'staging' ? 'dist-staging' : 'dist',
  },
}))
