import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '@/pages/pc/Index/index.vue'
import Setting from '@/pages/moblie/Setting/index.vue'
import Result from '@/pages/moblie/Result/index.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/setting', component: Setting },
  { path: '/result', component: Result }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
