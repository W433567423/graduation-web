import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

import mSetting from '@/mobile/pages/Setting/index.vue';
import mResult from '@/mobile/pages/Result/index.vue';
import pcHome from '@pc/pages/LayoutPage/index.vue';

import Login from '@pc/pages/LoginPage/index.vue';
import DashBoard from '@pc/pages/LayoutPage/DashBoard/index.vue';
import NewProject from '@pc/pages/LayoutPage/NewProject/index.vue';
import SetConfig from '@pc/pages/LayoutPage/SetConfig/index.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/pc-login'
	},
	{ path: '/pc-login', component: Login },
	{
		path: '/pc',
		component: pcHome,
		children: [
			{ path: 'dash', component: DashBoard },
			{ path: 'new', component: NewProject },
			{ path: 'set', component: SetConfig }
		]
	},
	{ path: '/setting', component: mSetting },
	{ path: '/result', component: mResult }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
