import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import postcssv from 'postcss'
import autoprefixer from 'autoprefixer'
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
        },
        extensions: ['.vue', '.ts', '.json'],
    },
    build: {
        rollupOptions: {
            input: {
                main: './src/app/main.ts',
            },
        },
    },
    css: {
        postcss: { plugins: [autoprefixer] },
    },
})
