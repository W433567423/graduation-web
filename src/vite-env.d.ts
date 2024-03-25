/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_API_BASEURL: string;
}

declare module '*.vue' {
	import { ComponentOptions } from 'vue';
	const componentOptions: ComponentOptions;
	export default componentOptions;
}
