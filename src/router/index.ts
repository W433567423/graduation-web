import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import mSetting from '@/mobile/pages/Setting/index.vue'
import mResult from '@/mobile/pages/Result/index.vue'
import pcHome from '@/pc/pages/index.vue'
import DashBoard from '@/pc/pages/DashBoard/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/pc'
  },
  {
    path: '/pc',
    component: pcHome,
    children: [
      { path: 'dashboard', component: DashBoard }]
  },
  { path: '/setting', component: mSetting },
  { path: '/result', component: mResult }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
