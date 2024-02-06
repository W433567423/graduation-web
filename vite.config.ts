import { vitePluginForArco } from '@arco-plugins/vite-vue';
import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
// import eslint from "vite-plugin-eslint";
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ArcoResolver()],
        }),
        Components({
            resolvers: [ArcoResolver({ sideEffect: true })],
        }),
        vitePluginForArco({
            style: 'css'
        }),
        // eslint(),
        UnoCSS(),
    ],
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
            "@pc": path.join(__dirname, "./src/pc"),
            "@m": path.join(__dirname, "./src/mobile"),
            'vue': 'vue/dist/vue.esm-bundler.js'
        },
    },
    server: {
        open: true,
    },
});
