import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 5173,
    strictPort: true,
  },
  // --- AÑADE ESTO PARA ARREGLAR APOLLO ---
  optimizeDeps: {
    include: ['@apollo/client/core', '@apollo/client/cache'],
    exclude: ['@apollo/client'] // A veces excluir el paquete raíz ayuda a que busque los sub-módulos
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Ayuda con librerías que mezclan formatos
    },
  },
})