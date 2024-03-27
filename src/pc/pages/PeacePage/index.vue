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
				<a-spin :loading="loading" class="w100% h-100%">
					<a-menu
						:default-selected-keys="['11_12']"
						:default-openKeys="['11']"
						:collapsed-width="54"
						@menu-item-click="changeMenu">
						<template v-for="e in menuList" :key="e.id">
							<!-- 二级菜单 -->
							<template v-if="e.children?.length">
								<a-sub-menu :title="e.title" :key="e.id">
									<!-- 一级菜单 -->
									<template v-if="e.children?.length">
										<a-menu-item v-for="item in e.children" :key="item.id">
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
								<a-menu-item :key="e.id">
									<template #icon v-if="e.icon">
										<component :is="e.icon" />
									</template>
									{{ e.title }}
								</a-menu-item>
							</template>
						</template>
					</a-menu>
				</a-spin>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-layout-content class="p0!">
				<router-view />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup>
import { type IPeaceMenuItem } from '@/services/interfaces/peace';
import { peacePost } from '@/services/peace.api';
import usePeaceStore from '@/stores/peace';
import { Notification } from '@arco-design/web-vue';
import PcHeader from '@pc/components/PcHeader/index.vue';
import { compile, h, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { type IMenuItem } from '../type';

const peaceStore = usePeaceStore();
const router = useRouter();

// 侧边栏事件
const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);

const loading = ref(true); // 加载状态
const linkArr = ref<Array<{ key: string; url: string }>>([{ key: '0', url: '/pc/dash' }]); // 菜单链接
// 菜单列表(默认)
const defaultMenu: IMenuItem[] = [
	{
		id: '0',
		title: '切换回毕设系统',
		link: '',
		icon: h(compile('<IconReply />'))
	}
];
// 菜单列表
const menuList = ref<IMenuItem[]>(defaultMenu);
// 切换菜单
const changeMenu = async (key: string) => {
	const url = linkArr.value.find((e) => e.key === key)?.url;
	console.log('🚀 ~ changeMenu ~ url:', url);
	// TODO 未完成的页面
	if (
		!url ||
		url === '' ||
		[
			'/channel/ManageAccList',
			'/channel/AssetClassSet',
			'/User/Userlist',
			'/User/Useradd',
			'/User/UseraAccount',
			'/User/member',
			'/User/UserInfo',
			'/Channel/usefulCh',
			'/Order/OrderList'
		].includes(url)
	) {
		Notification.warning({ content: '该页面暂未实现' });
		return false;
	} else if (url.includes('/pc')) return await router.replace({ path: url });
	else return await router.replace({ path: `/peace${url}` });
};

// 刷新菜单
const flashMenu = async () => {
	const res = await peacePost<null, IPeaceMenuItem[]>('/Pay_user/GetSystemsetList');
	loading.value = false;
	const mapMenuList = res.map((e) => {
		if (e.href) {
			linkArr.value.push({
				key: e.id.toString(),
				url: e.href
			});
		}
		const item: IMenuItem = {
			id: e.id.toString(),
			title: e.title,
			link: e.href,
			children: e.childMenus.map((child) => {
				if (child.href) {
					linkArr.value.push({
						key: e.id + '_' + child.id.toString(),
						url: child.href
					});
				}
				return {
					id: e.id + '_' + child.id.toString(),
					title: child.title,
					link: child.href
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
