import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

import mResult from '@/mobile/pages/Result/index.vue';
import mSetting from '@/mobile/pages/Setting/index.vue';
import pcHome from '@pc/pages/LayoutPage/index.vue';

import CodeView from '@pc/pages/LayoutPage/CodeView/index.vue';
import DashBoard from '@pc/pages/LayoutPage/DashBoard/index.vue';
import NewProject from '@pc/pages/LayoutPage/NewProject/index.vue';
import SetConfig from '@pc/pages/LayoutPage/SetConfig/index.vue';
import Login from '@pc/pages/LoginPage/index.vue';

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
			{ path: 'set', component: SetConfig },
			{ path: 'code', component: CodeView }
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
