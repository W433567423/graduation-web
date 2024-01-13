import { createRouter, createWebHashHistory } from 'vue-router'

const Home = import('../pages/Home/index.vue')
const Setting = import('../pages/Setting/index.vue')
const Result = import('../pages/Result/index.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/setting', component: Setting },
  { path: '/result', component: Result }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
