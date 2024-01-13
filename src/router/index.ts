import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import mSetting from '@/mobile/pages/Setting/index.vue'
import mResult from '@/mobile/pages/Result/index.vue'
import pcHome from '@/pc/pages/index.vue'

import DashBoard from '@/pc/pages/DashBoard/index.vue'
import NewProject from '@/pc/pages/NewProject/index.vue'
import SetConfig from '@/pc/pages/SetConfig/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/pc/dash'
  },
  {
    path: '/pc',
    component: pcHome,
    children: [
      { path: 'dash', component: DashBoard },
      { path: 'new', component: NewProject },
      { path: 'set', component: SetConfig }]
  },
  { path: '/setting', component: mSetting },
  { path: '/result', component: mResult }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
