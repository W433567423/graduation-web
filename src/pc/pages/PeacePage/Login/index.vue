<!--
* DONE
* @description: 平安登录
* @author: tutu
* @time: 2024-03-24 19:39:19
-->
<template>
	<a-card class="peace-login-wrap">
		<a-form :model="form" class="flex-items-center" @submit="handleLogin">
			<a-form-item
				label="用户名"
				required
				field="username"
				:rules="[{ required: true, message: '用户名必填' }]">
				<a-input v-model="form.username"></a-input>
			</a-form-item>
			<a-form-item
				:rules="[{ required: true, message: '密码必填' }]"
				label="密码"
				required
				field="password">
				<a-input v-model="form.password"></a-input>
			</a-form-item>
			<a-form-item
				:rules="[
					{ required: true, message: '动态码必填' },
					{
						validator: (value: number, callback): undefined => {
							if (value.toString().length !== 6) callback('动态码错误');
						}
					}
				]"
				label="动态码"
				required
				field="code">
				<a-input-number v-model="form.code"></a-input-number>
			</a-form-item>
			<a-button type="primary" class="w-100px mt-20px" html-type="submit">登录</a-button>
		</a-form>
	</a-card>
</template>

<script lang="ts" setup>
import { peaceLogin } from '@/services/peace.api';
import usePeaceStore from '@/stores/peace';
import { type ValidatedError } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const peaceStore = usePeaceStore();
const router = useRouter();
const route = useRoute();
const form = ref<{ username: string; password: string; code: number | undefined }>({
	username: '',
	password: '',
	code: undefined
});

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
	const res = await peaceLogin(form.value as { username: string; password: string; code: number });
	peaceStore.setPeaceUser(res);
	console.log('🚀 ~ handleLogin ~ res:', res);
	e.preventDefault();
	if (typeof route.query.redirect === 'string') {
		await router.replace(route.query.redirect);
	} else {
		await router.replace('/peace/yard');
	}
};
</script>

<style lang="less" scoped>
.peace-login-wrap {
	margin: 20vh auto;
	width: 400px;
	height: 300px;
	padding-top: 32px;
	box-sizing: border-box;
}
</style>
