import { createApp, type Component } from 'vue'

import pinia from '@/stores'
import 'virtual:uno.css'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App as Component)
app.use(pinia)
app.use(router) 
app.mount('#app')
