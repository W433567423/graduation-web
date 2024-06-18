import { getLocalStorage } from '@/utils';
import MobileLogin from '@mobile/pages/LoginPage/index.vue';
import PcLogin from '@pc/pages/LoginPage/index.vue';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	// main
	{ path: '/', component: async () => await import('@/views/index.vue') },
	// COOK
	{
		path: '/cook',
		children: [
			{ path: '', redirect: 'cook/index' },
			{ path: 'index', component: async () => await import('@/views/Cook/index.vue') },
			{ path: 'make/:id', component: async () => await import('@/views/Cook/make.vue') }
		]
	},
	// 平安平台
	{ path: '/peace-login', component: async () => await import('@/pc/pages/PeacePage/Login/index.vue') },
	{
		path: '/peace',
		component: async () => await import('@/pc/pages/PeacePage/index.vue'),
		redirect: '/peace/Order/yu_list',
		children: [
			{
				path: 'getYard',
				component: async () => await import('@/pc/pages/PeacePage/GetYard/index.vue')
			},
			{
				path: 'Order/yu_list',
				component: async () => await import('@/pc/pages/PeacePage/GetYard/index.vue')
			},
			{
				path: 'User/Pay_money',
				component: async () => await import('@/pc/pages/PeacePage/PayRecord/index.vue')
			},
			{
				path: 'Channel/Index',
				component: async () => await import('@/pc/pages/PeacePage/Channel/index.vue')
			}
		]
	},
	// pc端
	{ path: '/pc-login', component: PcLogin },
	{
		path: '/pc',
		component: async () => await import('@/pc/pages/LayoutPage/index.vue'),
		redirect: '/pc/dash',
		children: [
			// 癌症诊断系统
			{ path: 'hfs-index', component: async () => await import('@/pc/pages/LayoutPage/HFSPage/index.vue') },
			{
				path: 'result',
				component: async () => await import('@/pc/pages/LayoutPage/HFSPage/result.vue')
			},
			{
				path: 'special-result',
				component: async () => await import('@/pc/pages/LayoutPage/HFSPage/special.vue')
			},
			{
				path: 'diffData-result',
				component: async () => await import('@/pc/pages/LayoutPage/HFSPage/diff.vue')
			},
			{
				path: 'hot-result',
				component: async () => await import('@/pc/pages/LayoutPage/HFSPage/hot.vue')
			},
			// 移动端
			{ path: 'dash', component: async () => await import('@/pc/pages/LayoutPage/DashBoard/index.vue') },
			{ path: 'new', component: async () => await import('@/pc/pages/LayoutPage/NewProject/index.vue') },
			{ path: 'set', component: async () => await import('@/pc/pages/LayoutPage/SetConfig/index.vue') },
			{ path: 'code', component: async () => await import('@/pc/pages/LayoutPage/CodeView/index.vue') },
			{ path: 'DRWBNCF', component: async () => await import('@/pc/pages/LayoutPage/DRWBNCF/index.vue') }
		]
	},
	{ path: '/pc-workspace', component: async () => await import('@/pc/pages/WorkSpacePage/index.vue') },
	{ path: '/m-login', component: MobileLogin },
	{
		path: '/m',
		children: [
			// 癌症诊断系统
			{ path: 'hfs-index', component: async () => await import('@/pc/pages/LayoutPage/HFSPage/index.vue') },
			{
				path: 'hfs-result',
				component: async () => await import('@/pc/pages/LayoutPage/HFSPage/result.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (to.fullPath.includes('peace')) {
		if (getLocalStorage('peace') === 'allow') next();
		else next(from.fullPath);
	} else next();
});

export default router;
