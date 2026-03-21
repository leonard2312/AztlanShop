import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Necesario para que detecte cambios en Windows/Docker
    },
    host: true, // Escuchar en todas las IPs
    port: 5173,
  },
})
