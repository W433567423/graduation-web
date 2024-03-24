<template>
	<a-layout>
		<PcHeader />

		<a-layout>
			<!-- 侧边栏 -->
			<a-layout-sider
				breakpoint="lg"
				collapsible
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
		title: '面板',
		link: 'dash',
		icon: h(compile('<IconApps />'))
	},
	{
		id: '2',
		title: '新建项目',
		link: 'new',
		icon: h(compile('<IconPlus />'))
	},
	{
		id: '3',
		title: '设置',
		link: 'set',
		icon: h(compile('<IconBug />'))
	}
];
const changeMenu = async (url: string) => {
	await router.replace({ path: `/pc/${url}` });
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
