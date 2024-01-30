import { type Component, createApp } from 'vue'

import 'virtual:uno.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { rejectElement } from '@/common'
import pinia from '@/stores'

const app = createApp(App as Component)
app.use(pinia)
app.use(router)
rejectElement(app)
app.mount('#app')
