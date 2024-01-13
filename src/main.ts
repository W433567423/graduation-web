import { type Component, createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App as Component)
  .use(router)
  .mount('#app')
