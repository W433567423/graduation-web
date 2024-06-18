import pinia from '@/stores';
// import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import 'virtual:uno.css';
import { createApp, type Component } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App as Component);
app.use(pinia);
app.use(router);
app.use(VueDOMPurifyHTML);
// app.use(ArcoVue);
app.use(ArcoVueIcon as any);
app.mount('#app');
