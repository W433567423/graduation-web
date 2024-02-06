<!--
* DONE
* @description: 登录 组件
* @author: tutu
* @time: 2024/1/30 17:09
-->
<template>
	<div class="login-form-wrap">
		<!-- logo -->
		<div class="login-text">{{ isLoginPage ? 'Login' : 'Registry' }}</div>
		<!-- 表单 -->
		<a-form
			:model="form"
			:rules="formRules"
			class="form-wrap"
			layout="vertical"
			@submit="userLoginOrRegistry">
			<a-form-item validate-trigger="blur" label="账户名" field="username" required>
				<a-input name="username" v-model="form.username" clearable placeholder="请输入账号名">
					<template #prefix><icon-user /></template>
				</a-input>
			</a-form-item>

			<a-form-item validate-trigger="blur" label="密码" field="password" required>
				<a-input
					name="password"
					v-model="form.password"
					clearable
					placeholder="请输入密码"
					show-password
					type="password">
					<template #prefix><icon-Lock /></template>
				</a-input>
			</a-form-item>

			<a-form-item validate-trigger="blur" v-if="!isLoginPage" label="邮箱" field="emailNum" required>
				<a-input
					name="emailNum"
					v-model="form.emailNum"
					:prefix-icon="Message"
					clearable
					placeholder="请输入邮箱">
					<template #prefix><icon-email /></template>
				</a-input>
			</a-form-item>

			<a-form-item validate-trigger="blur" v-if="isLoginPage" label="验证码" field="valida" required>
				<div class="form-valida-wrap">
					<a-input name="valida" v-model="form.valida" clearable placeholder="请输入验证码">
						<template #prefix><icon-message /></template>
					</a-input>
					<div class="valida-wrap" @click="flashValidaCode" v-html="imgSrc" v-if="imgSrc" />
					<div class="valida-wrap" v-else>
						<a-image class="w-108px h-40px" />
					</div>
				</div>
			</a-form-item>

			<a-form-item validate-trigger="blur" v-else label="邮箱验证码" required field="emailValida">
				<div class="form-valida-wrap mb-16px">
					<a-input name="emailValida" v-model="form.emailValida" clearable placeholder="请输入验证码">
						<template #prefix><icon-message /></template>
					</a-input>
					<a-button :loading="isValidaLoading" class="ml-16px" @click="flashEmailValidaCode">发送</a-button>
				</div>
			</a-form-item>

			<div v-if="isLoginPage" class="form-extra-wrap">
				<div class="remember-wrap">
					<a-checkbox v-model="isRemember" @change="handleChangeRemember">记住我</a-checkbox>
				</div>
				<a-link :hoverable="false" @click="emits('changePage')">忘记密码</a-link>
			</div>
			<!-- 登录按钮 -->
			<a-button long html-type="submit" shape="round" type="primary">
				{{ isLoginPage ? '登录' : '注册' }}
			</a-button>
		</a-form>
		<div>
			<!-- 切换登录/注册状态 -->
			<div class="registry-wrap">
				{{ isLoginPage ? '没有账号？' : '已有账号' }}
				<a-link :hoverable="false" type="info" @click="changeStatus">
					{{ isLoginPage ? '去注册' : '去登录' }}
				</a-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getEmailValidaCode, getValidaCode } from '@/services/captchas.api.ts';
import { type IUserLoginForm } from '@/services/interfaces/users';
import { postUserLogin, postUserRegistry } from '@/services/users.api.ts';
import useUserStore from '@/stores/user.ts';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { Message, Notification, type FieldRule, type ValidatedError } from '@arco-design/web-vue';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const emits = defineEmits(['changePage']);

const form: Ref<IUserLoginForm> = ref({
	username: '',
	password: '',
	valida: '',
	emailValida: '',
	emailNum: ''
}); // 表单
const isRemember = ref(false); // 记住用户
const imgSrc = ref(''); // 验证码
const isLoginPage = ref(true); // 是否登录页面（true:登录,false:注册）
const isValidaLoading = ref(false); // 获取验证码loading状态
const emailRex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

const formRules = ref<Record<string, FieldRule<any> | Array<FieldRule<any>>> | undefined>({
	username: [
		{ required: true, message: '用户名必填' },
		{ minLength: 3, maxLength: 10, message: '用户名长度为3-10' }
	],
	password: [
		{ required: true, message: '密码必填' },
		{ minLength: 3, maxLength: 10, message: '密码长度为3-10' }
	],
	valida: [
		{ required: true, message: '验证码必填' },
		{ length: 4, message: '验证码错误' }
	],
	emailValida: [
		{ required: true, message: '邮箱验证码必填' },
		{ length: 6, message: '邮箱验证码错误' }
	],
	emailNum: [
		{ required: true, message: '邮箱必填' },
		{
			match: emailRex,
			message: '邮箱不正确'
		}
	]
}); // 校验规则

// 刷新验证码
const flashValidaCode = async () => {
	if (isLoginPage.value) {
		const res = await getValidaCode();
		imgSrc.value = res;
	}
};

// 获取邮箱验证码
const flashEmailValidaCode = () => {
	if (emailRex.test(form.value.emailNum)) {
		isValidaLoading.value = !isValidaLoading.value;
		void getEmailValidaCode(form.value.emailNum)
			.then(() => Notification.success({ content: '发送验证码成功' }))
			.finally(() => {
				isValidaLoading.value = !isValidaLoading.value;
			});
	} else {
		Notification.error({ content: '邮箱不正确' });
	}
};

// 登录功能
const userLoginOrRegistry = async ({
	errors
}: {
	values: Record<string, any>;
	errors: Record<string, ValidatedError> | undefined;
}) => {
	if (!errors) {
		const { username, password } = form.value;
		let token = '';
		if (isLoginPage.value) {
			// 登录
			token = await postUserLogin(form.value);
		} else {
			//   注册
			token = await postUserRegistry(form.value);
		}
		if (token) {
			userStore.setToken(token);
			Message.success({
				content: (isLoginPage.value ? '登录' : '注册') + '成功'
			});
			setLocalStorage('user', { username, password });
			// 登录/注册成功后跳转
			if (typeof route.query.redirect === 'string') {
				await router.replace(route.query.redirect);
			} else await router.replace('/pc/dash');
		} else await flashValidaCode();
	}
};

// 缓存记住我
const handleChangeRemember = (value: string | number | boolean) => {
	setLocalStorage('isRemember', String(value));
};

// 切换登录/注册
const changeStatus = () => {
	isLoginPage.value = !isLoginPage.value;
	void flashValidaCode();
};

// 初始化
const init = () => {
	isRemember.value = Boolean(getLocalStorage('isRemember') === 'true');
	if (isRemember.value) {
		const userStorage = getLocalStorage('user');
		if (userStorage instanceof Object) {
			try {
				form.value = userStorage;
			} catch (e) {
				console.log(e);
			}
		}
	}
	void flashValidaCode();
};

onBeforeMount(async () => {
	if (userStore.token) {
		// 如果有token直接去面板页面
		await router.replace('/pc/dash');
	} else {
		init();
	}
});
</script>

<style lang="less" scoped>
.login-form-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	box-sizing: border-box;
	height: 100%;
	padding: 24px 32px;
	background-color: #fff;
	user-select: none;

	//登录文案
	.login-text {
		font-weight: bold;
		font-size: 36px;
		color: #6c6c6c;
	}

	.form-wrap {
		// 验证码
		.form-valida-wrap {
			display: flex;
			justify-content: space-between;
			width: 100%;
			line-height: 0;

			.valida-wrap {
				width: 108px;
				margin-left: 12px;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-self: center;
			}
		}

		//记住用户/忘记密码
		.form-extra-wrap {
			margin-top: 8px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 30px;

			span {
				font-size: 14px;

				&:hover {
					cursor: pointer;
					color: #79bbff;
				}
			}
		}
	}

	// 注册区域
	.registry-wrap {
		font-size: 14px;

		span:hover {
			cursor: pointer;
			color: #79bbff;
		}
	}
}
</style>
