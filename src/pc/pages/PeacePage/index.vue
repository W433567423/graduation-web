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
				<a-menu :default-selected-keys="['-1']">
					<template v-for="e in menuList" :key="e.id">
						<!-- 二级菜单 -->
						<template v-if="e.children?.length">
							<a-sub-menu @click="changeMenu(e.link)" :title="e.title" :key="e.id">
								<template #icon>
									<component :is="e.icon" />
								</template>
								<!-- 一级菜单 -->
								<template v-if="e.children?.length">
									<a-menu-item @click="changeMenu(item.link)" v-for="item in e.children" :key="item.id">
										<template #icon>
											<component :is="item.icon" />
										</template>
										{{ item.title }}
									</a-menu-item>
								</template>
							</a-sub-menu>
						</template>
						<!-- 一级菜单 -->
						<template v-else>
							<a-menu-item @click="changeMenu(e.link)" :key="e.id">
								<template #icon>
									<component :is="e.icon" />
								</template>
								{{ e.title }}
							</a-menu-item>
						</template>
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
import { getMenu } from '@/services/peace.api';
import PcHeader from '@pc/components/PcHeader/index.vue';
import { compile, h, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { type IMenuItem } from '../type';

import usePeaceStore from '@/stores/peace';
const peaceStore = usePeaceStore();
const router = useRouter();
const defaultMenu = [
	{
		id: '0',
		title: '切换回毕设系统',
		link: '/pc/dash',
		icon: h(compile('<IconReply />'))
	},
	{
		id: '-1',
		title: '产码列表',
		link: '/peace/yard',
		icon: h(compile('<IconApps />'))
	}
];
const menuList = ref<IMenuItem[]>(defaultMenu);
const changeMenu = async (url: string) => {
	if (url === '') {
		console.log('无链接');
	} else if (url.includes('/pc')) return await router.replace({ path: url });
	else return await router.replace({ path: `/peace${url}` });
};
const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);

const flashMenu = async () => {
	const res = await getMenu();
	const mapMenuList = res.map((e) => {
		const item: IMenuItem = {
			id: e.id.toString(),
			title: e.title,
			link: '',
			icon: h(compile('<IconApps />')),
			children: e.childMenus.map((child) => {
				return {
					id: e.id + '_' + child.id.toString(),
					title: child.title,
					link: child.href,
					icon: h(compile('<IconApps />'))
				};
			})
		};
		return item;
	});

	menuList.value = defaultMenu.concat(mapMenuList);
};

onBeforeMount(() => {
	peaceStore.init();
	flashMenu();
});
</script>

<style lang="less" scoped></style>
