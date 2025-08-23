import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sitio en https://alejo1207.github.io/portal-educativo/
export default defineConfig({
  plugins: [react()],
  base: '/portal-educativo/',
})
