import { type Component, createApp } from 'vue'
import 'normalize.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { rejectElement } from '@/common'

const app = createApp(App as Component)
app.use(router)
rejectElement(app)
app.mount('#app')
