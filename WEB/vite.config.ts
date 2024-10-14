import path from "node:path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import srvg from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    srvg()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})