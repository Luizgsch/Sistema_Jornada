import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Sistema_Jornada/", // OBRIGATÓRIO para GitHub Pages
})
