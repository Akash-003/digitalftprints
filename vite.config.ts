import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain (digitalftprints.com) serves from root, so base is '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
