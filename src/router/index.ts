import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

import { getLocalStorage } from '@/utils';
import Login from '@pc/pages/LoginPage/index.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/pc-login'
	},
	// 平安平台
	{ path: '/pinan-login', component: async () => await import('@/pc/pages/PinanPage/Login/index.vue') },
	{
		path: '/pinan',
		component: async () => await import('@/pc/pages/PinanPage/index.vue'),
		redirect: '/pinan/yard',
		children: [
			{ path: 'yard', component: async () => await import('@/pc/pages/PinanPage/GetYard/index.vue') }
		]
	},
	// pc端
	{ path: '/pc-login', component: Login },
	{
		path: '/pc',
		component: async () => await import('@/pc/pages/LayoutPage/index.vue'),
		redirect: '/pc/dash',
		children: [
			{ path: 'dash', component: async () => await import('@/pc/pages/LayoutPage/DashBoard/index.vue') },
			{ path: 'new', component: async () => await import('@/pc/pages/LayoutPage/NewProject/index.vue') },
			{ path: 'set', component: async () => await import('@/pc/pages/LayoutPage/SetConfig/index.vue') },
			{ path: 'code', component: async () => await import('@/pc/pages/LayoutPage/CodeView/index.vue') }
		]
	},
	{ path: '/pc-workspace', component: async () => await import('@/pc/pages/WorkSpacePage/index.vue') },
	// 移动端
	{
		path: '/mobile',
		children: [
			{ path: '/setting', component: async () => await import('@/mobile/pages/Setting/index.vue') },
			{ path: '/result', component: async () => await import('@/mobile/pages/Result/index.vue') }
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (to.fullPath.includes('pinan')) {
		if (getLocalStorage('pinan') === 'allow') next();
		else next(from.fullPath);
	} else next();
});

export default router;
