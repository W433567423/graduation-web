<!--
* DONE
* @description: pc头部 组件
* @author: tutu
* @time: 2024-03-07 15:11:19
-->
<template>
	<!-- 头部 -->
	<a-layout-header class="pc-header-wrap">
		<slot><div /></slot>
		<a-dropdown trigger="hover">
			<a-avatar class="mr-36px">
				<img alt="avatar" class="header-avatar-img" src="@/assets/images/avatar.jpg" />
			</a-avatar>
			<template #content>
				<a-doption :disabled="true">个人资料</a-doption>
				<a-doption :disabled="true">其他功能</a-doption>
				<a-doption divided @click="handleLogout">退出登录</a-doption>
			</template>
		</a-dropdown>
	</a-layout-header>
</template>

<script lang="ts" setup>
import useUserStore from '@/stores/user.ts';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

// 退出登录
const handleLogout = async () => {
	userStore.clearToken();
	await router.replace('/pc-login');
	Message.success({ content: '退出登录成功' });
};
</script>
<style lang="less" scoped>
.pc-header-wrap {
	height: 64px;
	background-color: #2d2d2d;
	display: flex;
	justify-content: space-between;
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
</style>
