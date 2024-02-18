<template>
	<a-layout>
		<!-- 头部 -->
		<a-layout-header class="index-header">
			<a-dropdown trigger="hover">
				<a-avatar>
					<img alt="avatar" class="header-avatar-img" src="@/assets/images/avatar.jpg" />
				</a-avatar>
				<template #content>
					<a-doption>个人资料</a-doption>
					<a-doption>其他功能</a-doption>
					<a-doption divided @click="handleLogout">退出登录</a-doption>
				</template>
			</a-dropdown>
		</a-layout-header>

		<a-layout>
			<!-- 侧边栏 -->
			<a-layout-sider
				breakpoint="lg"
				class="a-sider-vertical-demo"
				collapsible
				:collapsed="collapsed"
				@collapse="onCollapse"
				:width="220">
				<a-menu mode="pop" :default-selected-keys="[1]">
					<template v-for="e in menuList" :key="e.id">
						<a-menu-item @click="changeMune(e.link)">
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
				<bread-nav />
				<main class="main-contain-wrap">
					<router-view />
				</main>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup>
import useUserStore from '@/stores/user.ts';
import { Message } from '@arco-design/web-vue';
import breadNav from '@pc/components/BreadNav/index.vue';
import { compile, h, ref } from 'vue';
import { useRouter } from 'vue-router';
import { type IMenuItem } from './type';

const userStore = useUserStore();
const router = useRouter();

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
const changeMune = async (url: string) => {
	await router.replace({ path: `/pc/${url}` });
};
const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);
// 退出登录
const handleLogout = async () => {
	userStore.clearToken();
	await router.replace('/pc-login');
	Message.success({ content: '退出登录成功' });
};
</script>

<style lang="less" scoped>
.index-header {
	height: 64px;
	background-color: #2d2d2d;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	padding: 0 12px;
	box-sizing: border-box;

	.header-avatar-img {
		width: 42px;
		height: 42px;
		border-radius: 28px;
		transition: 0.5s;
		cursor: pointer;
	}

	.header-avatar-img:hover {
		transform: rotate(360deg);
	}
}

.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}

.main-contain-wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 112px);
}
</style>
