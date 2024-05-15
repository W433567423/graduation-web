<template>
	<a-layout class="h100%">
		<PcHeader />

		<a-layout class="h100%">
			<!-- 侧边栏 -->
			<a-layout-sider
				:collapsible="true"
				breakpoint="lg"
				:collapsed="collapsed"
				@collapse="onCollapse"
				:width="220">
				<a-menu mode="pop" :default-selected-keys="['1']">
					<a-menu-item v-for="e in menuList" @click="changeMenu(e.link)" :key="e.id">
						<template #icon>
							<component :is="e.icon" />
						</template>
						{{ e.title }}
					</a-menu-item>
				</a-menu>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-layout-content class="p0!">
				<router-view />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup>
import PcHeader from '@pc/components/PcHeader/index.vue';
import { compile, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { type IMenuItem } from '../type';

const router = useRouter();
const customBreadNav = ref(false);

const menuList: IMenuItem[] = [
	{
		id: '1',
		title: '乳腺癌分类',
		link: '/hfs-index',
		icon: h(compile('<icon-heart />'))
	},
	{
		id: '2',
		title: '乳腺癌相关知识',
		link: '/hfs-about',
		icon: h(compile('<icon-heart />'))
	},
	{
		id: '3',
		title: '病例上传',
		link: '/hfs-upload-case',
		icon: h(compile('<icon-heart />'))
	},
	{
		id: '3',
		title: '查看诊断历史',
		link: '/hfs-history',
		icon: h(compile('<icon-heart />'))
	},

	{
		id: '4',
		title: '设置',
		link: '/set',
		icon: h(compile('<icon-bug />'))
	},
	{
		id: '5',
		title: '脚本项目管理面板',
		link: '/dash',
		icon: h(compile('<icon-home />'))
	},
	{
		id: '6',
		title: '新建脚本项目',
		link: '/new',
		icon: h(compile('<icon-plus />'))
	},
	{
		id: '7',
		title: '平安平台',
		link: '/peace-login',
		icon: h(compile('<icon-code-sandbox />'))
	}
	// {
	// 	id: '5',
	// 	title: 'DRWBNCF',
	// 	link: '/DRWBNCF',
	// 	icon: h(compile('<icon-code-sandbox />'))
	// }
];
const changeMenu = async (url: string) => {
	// 特殊处理
	if (url.includes('peace')) await router.replace({ path: `${url}` });
	else await router.replace({ path: `/pc${url}` });
};
const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);

onMounted(() => {
	if (router.currentRoute.value.path === '/pc/code') {
		customBreadNav.value = true;
	}
});
</script>

<style lang="less" scoped>
.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}
</style>
