import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
// import eslint from "vite-plugin-eslint";
export default defineConfig({
    plugins: [
        vue(), 
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        // eslint(),
        UnoCSS(),
    ],
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
            "@pc": path.join(__dirname, "./src/pc"),
            "@m": path.join(__dirname, "./src/mobile"),
        },
    },
    server: {
        open: true,
    },
});
