<template>
	<a-layout class="h100vh">
		<PcHeader />

		<a-layout style="height: calc(100vh - 64px)">
			<!-- 侧边栏 -->
			<a-layout-sider
				:collapsible="true"
				breakpoint="lg"
				:collapsed="collapsed"
				@collapse="onCollapse"
				:width="300">
				<a-menu :selected-keys="selectMenu">
					<a-menu-item
						v-for="e in menuList"
						@click="changeMenu(e.link, e.id)"
						:key="e.id"
						:disabled="e.disabled">
						<template #icon>
							<component :is="e.icon" />
						</template>
						{{ e.title }}
					</a-menu-item>
				</a-menu>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-layout-content class="p0!">
				<router-view @changeMenu="handleChangeMenu" />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup>
import useHfsStore from '@/stores/hfs';
import { Notification } from '@arco-design/web-vue';
import PcHeader from '@pc/components/PcHeader/index.vue';
import { compile, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { type IMenuItem } from '../type';
const router = useRouter();
const customBreadNav = ref(false);
const hfsStore = useHfsStore();

const selectMenu = ref(['1']);
const menuList = ref<IMenuItem[]>([
	{
		id: '1',
		title: '乳腺癌分类系统',
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
]);
const changeMenu = async (url: string, i: string) => {
	console.log('🚀 ~ changeMenu ~ url:', url);
	if (hfsStore.isDetected && !['0', '1'].includes(i)) {
		return Notification.error({
			title: '提示',
			content: '请先进行分类'
		});
	}
	selectMenu.value = [i];
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

const handleChangeMenu = (i: string) => {
	selectMenu.value = [i];
};

onMounted(() => {
	if (router.currentRoute.value.path === '/pc/code') {
		customBreadNav.value = true;
	}
	hfsStore.init();
});
</script>

<style lang="less" scoped>
.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}
</style>
