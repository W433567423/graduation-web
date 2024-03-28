<!--
* DONE
* @description: 平安登录
* @author: tutu
* @time: 2024-03-24 19:39:19
-->
<template>
	<a-spin :loading="loading" class="peace-login-wrap">
		<a-card
			class="peace-login-wrap"
			:body-style="{ width: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
			<h2 class="pb-20px">登录平安系统</h2>
			<a-form :model="form" class="flex-items-center" @submit="handleLogin">
				<a-form-item
					label="用户名"
					required
					field="username"
					:rules="[{ required: true, message: '用户名必填' }]">
					<a-input v-model="form.username" placeholder="请输入用户名"></a-input>
				</a-form-item>
				<a-form-item
					:rules="[{ required: true, message: '密码必填' }]"
					label="密码"
					required
					field="password">
					<a-input v-model="form.password" placeholder="请输入密码" type="password"></a-input>
				</a-form-item>
				<a-form-item
					:rules="[
						{ required: true, message: '动态码必填' },
						{
							validator: (value: number, callback): undefined => {
								console.log('🚀 ~ value:', value);

								if (value.toString().length !== 6 && value !== 0) callback('动态码错误');
							}
						}
					]"
					label="动态码"
					required
					field="code">
					<a-input-number v-model="form.code" placeholder="请输入动态码"></a-input-number>
				</a-form-item>
				<a-button type="primary" :loading="loading" class="w100px mt-20px" html-type="submit">
					登录
				</a-button>
			</a-form>
		</a-card>
	</a-spin>
</template>

<script lang="ts" setup>
import { peaceLogin } from '@/services/peace.api';
import usePeaceStore from '@/stores/peace';
import useUserStore from '@/stores/user';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { type ValidatedError } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const peaceStore = usePeaceStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);

const form = ref<{ username: string; password: string; code: number | undefined }>({
	username: '',
	password: '',
	code: undefined
});

// 登录 平安系统
const handleLogin = async (
	data: {
		values: Record<string, any>;
		errors: Record<string, ValidatedError> | undefined;
	},
	e: Event
) => {
	if (data.errors) {
		console.log('🚀 ~ data.errors:', data.errors);
		return;
	}
	loading.value = true;
	const res = await peaceLogin(form.value as { username: string; password: string; code: number });
	console.log('🚀 ~ res:', res);
	peaceStore.setPeaceUser(res.peaceUser);
	userStore.user.peace = res.peaceCookie;
	userStore.setUser(userStore.user);

	setLocalStorage('peaceLogin', { username: form.value.username, password: form.value.password });
	loading.value = false;
	e.preventDefault();
	if (typeof route.query.redirect === 'string') {
		await router.replace(route.query.redirect);
	} else {
		await router.replace('/peace/Order/yu_list');
	}
};

onMounted(() => {
	if (userStore.user.peace) {
		router.replace('/peace/Order/yu_list');
	} else {
		getLocalStorage('peaceLogin') && (form.value = getLocalStorage('peaceLogin'));
	}
});
</script>

<style lang="less" scoped>
.peace-login-wrap {
	margin: 20vh auto;
	width: 420px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
}
</style>
