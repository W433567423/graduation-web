import vue from '@vitejs/plugin-vue';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
	base: './',
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
			verbose: true, // 默认即可
			disable: false, // 开启压缩(不禁用)，默认即可
			deleteOriginFile: false, // 删除源文件
			threshold: 307200,
			algorithm: 'gzip', // 压缩算法
			ext: '.gz' // 文件类型
		}),
		// 依赖分析
		visualizer({
			open: true, // 注意这里要设置为true，否则无效，如果存在本地服务端口，将在打包后自动展示
			gzipSize: true,
			// file: 'stats.html', //分析图生成的文件名
			brotliSize: true
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
		chunkSizeWarningLimit: 1024,
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
			}
		}
	}
});
