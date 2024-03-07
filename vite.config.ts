import vue from '@vitejs/plugin-vue';
import path from 'path';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ArcoResolver()]
		}),
		Components({
			resolvers: [ArcoResolver({ sideEffect: true })]
		}),
		// eslint(),
		UnoCSS(),
		// 代码压缩(300kb以上的文件进行压缩)
		viteCompression({
			threshold: 307200
		})
	],
	resolve: {
		alias: {
			'@': path.join(__dirname, './src'),
			'@pc': path.join(__dirname, './src/pc'),
			'@m': path.join(__dirname, './src/mobile'),
			vue: 'vue/dist/vue.esm-bundler.js'
		}
	},
	server: {
		open: true,
		port: 8003
	},
	build: {
		chunkSizeWarningLimit: 1024
	}
});
