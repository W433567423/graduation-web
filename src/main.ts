import { type Component, createApp } from 'vue'
import 'normalize.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { rejectElement } from '@/common'
import { createPinia } from 'pinia'

const app = createApp(App as Component)
app.use(router)
app.use(createPinia())
rejectElement(app)
app.mount('#app')
