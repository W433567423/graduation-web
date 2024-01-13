import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path'

import eslint from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslint(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })],
    resolve: {
        alias: {
            '@': path.join(__dirname, './src'),
            '@pc': path.join(__dirname, './src/pc'),
            '@m': path.join(__dirname, './src/mobile')
        }
    }
})
