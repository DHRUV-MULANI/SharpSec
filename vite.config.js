import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  }
})
