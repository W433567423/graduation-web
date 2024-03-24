<!--
* DONE
* @description: 取码列表
* @author: tutu
* @time: 2024-03-24 18:25:55
-->
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
				<a-menu mode="pop" :default-selected-keys="[1]">
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
		title: '产码列表',
		link: 'yard',
		icon: h(compile('<IconApps />'))
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

<style lang="less" scoped></style>
