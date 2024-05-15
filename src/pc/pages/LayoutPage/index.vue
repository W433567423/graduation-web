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
				:width="300">
				<a-menu :default-selected-keys="['1']">
					<template v-for="e in menuList" :key="e.id">
						<a-sub-menu @click="changeMenu(e.link)" v-if="e.children?.length">
							<template #title>
								{{ e.title }}
							</template>

							<a-menu-item
								v-for="item in e.children"
								:key="item.id"
								@click="changeMenu(item.link)"
								:disabled="item.disabled">
								<template #icon>
									<component :is="item.icon" />
								</template>
								{{ item.title }}
							</a-menu-item>
						</a-sub-menu>

						<a-menu-item @click="changeMenu(e.link)" v-else :key="e.id" :disabled="e.disabled">
							<template #icon>
								<component :is="e.icon" />
							</template>
							{{ e.title }}
						</a-menu-item>
					</template>
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
	// {
	// 	id: '2',
	// 	title: '查看上次分类结果',
	// 	link: '',
	// 	icon: h(compile('<icon-heart />')),
	// 	children: [

	// 	]
	// },
	{
		id: '2',
		title: '本模型对乳腺癌的诊断结果',
		link: '/result',
		icon: h(compile('<icon-code-sandbox />'))
	},
	{
		id: '3',
		title: '特征与结果关系',
		link: '/special-result',
		icon: h(compile('<icon-code-sandbox />'))
	},
	{
		id: '4',
		title: '不同数据集的比较',
		link: '/diffData-result',
		icon: h(compile('<icon-code-sandbox />'))
	},
	{
		id: '5',
		title: '不同数据集的比较（热力图）',
		link: '/hot-result',
		icon: h(compile('<icon-code-sandbox />'))
	},
	{
		id: '0',
		title: '设置',
		link: '/set',
		icon: h(compile('<icon-bug />')),
		disabled: true
	}
	// {
	// 	id: '5',
	// 	title: '脚本项目管理面板',
	// 	link: '/dash',
	// 	icon: h(compile('<icon-home />'))
	// },
	// {
	// 	id: '6',
	// 	title: '新建脚本项目',
	// 	link: '/new',
	// 	icon: h(compile('<icon-plus />'))
	// },
	// {
	// 	id: '7',
	// 	title: '平安平台',
	// 	link: '/peace-login',
	// 	icon: h(compile('<icon-code-sandbox />'))
	// }
	// {
	// 	id: '5',
	// 	title: 'DRWBNCF',
	// 	link: '/DRWBNCF',
	// 	icon: h(compile('<icon-code-sandbox />'))
	// }
];
const changeMenu = async (url: string) => {
	console.log('🚀 ~ changeMenu ~ url:', url);
	// 特殊处理
	switch (url) {
		case '':
			break;
		default:
			if (url.includes('peace')) await router.replace({ path: `${url}` });
			else await router.replace({ path: `/pc${url}` });
			break;
	}
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
