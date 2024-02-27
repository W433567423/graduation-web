import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { createApp, type Component } from 'vue';

import pinia from '@/stores';
import 'virtual:uno.css';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App as Component);
app.use(pinia);
app.use(router);
app.use(ArcoVueIcon as any);
app.use(VueDOMPurifyHTML);
app.mount('#app');
