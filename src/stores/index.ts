import { createPinia } from 'pinia';
import type { Plugin } from 'vue';

const pinia = createPinia() as unknown as Plugin;
export default pinia;
