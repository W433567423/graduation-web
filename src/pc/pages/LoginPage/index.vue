<!--
* DONE
* @description: index 组件
* @author: tutu
* @time: 2024/1/29 10:12
-->

<template>
	<div class="login-page">
		<!--登录注册-->
		<a-card shadow="hover" :bordered="false">
			<template v-if="!forgetPage">
				<div class="login-dialog-left">
					<LoginForm @change-page="forgetPage = !forgetPage" />
				</div>

				<div class="login-dialog-right"></div>
			</template>

			<ForgetPassword v-else @change-status="forgetPage = !forgetPage" />
		</a-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ForgetPassword from './cpns/ForgetPassword.vue';
import LoginForm from './cpns/LoginForm.vue';

const forgetPage = ref(false); // 是否是忘记密码页面
</script>

<style lang="less" scoped>
.login-page {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: url('//tutu-1313352375.cos.ap-nanjing.myqcloud.com/graduation/images/login-bg.jpg');
	background-size: cover;
	overflow: hidden;

	:deep(.arco-card-body) {
		width: 810px;
		aspect-ratio: 3/2;
		display: flex;
		padding: 0;
		overflow: hidden;

		.login-dialog-left {
			width: 50%;
			height: 100%;
		}

		.login-dialog-right {
			width: 50%;
			background: url('//tutu-1313352375.cos.ap-nanjing.myqcloud.com/graduation/images/login-column-bg.jpg');
			background-size: cover;
		}
	}
}

:deep(.is-hover-shadow:hover) {
	box-shadow: 0 0 32px rgba(0, 0, 0, 0.32);
}
</style>
