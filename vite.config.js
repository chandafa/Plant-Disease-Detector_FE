import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),

    ],
    root: path.resolve(__dirname, 'src'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    server: {
        port: 3000,
    }
})