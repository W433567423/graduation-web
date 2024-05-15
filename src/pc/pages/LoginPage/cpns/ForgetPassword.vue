<!--
* DONE
* @description: forgetPassword 组件
* @author: tutu
* @time: 2024/1/31 17:48
-->
<template>
	<div class="forget-password-wrap">
		<a-steps :active="active" class="wfull" finish-status="success">
			<a-step title="选择验证方式" />
			<a-step title="重置密码" />
			<a-step title="完成" />
		</a-steps>
		<div class="forget-password-step-wrap">
			<template v-if="active === 0">
				<section class="flex justify-around w-100%">
					<div class="flex flex-col flex-items-center">
						<div
							class="forget-icon-radius-box mb-32px"
							@click="
								active++;
								whichMethod = 0;
							">
							<icon-phone size="108px" style="color: #79bbff" />
						</div>
						<text class="forget-icon-text">手机号找回</text>
					</div>
					<div class="flex flex-col flex-items-center">
						<div
							class="forget-icon-radius-box mb-32px border-#95d475!"
							@click="
								active++;
								whichMethod = 1;
							">
							<icon-email size="108px" style="color: #95d475" />
						</div>
						<text class="forget-icon-text">邮箱找回</text>
					</div>
				</section>
				<a-button type="primary" status="success" class="w80px" size="large" @click="emits('changeStatus')">
					上一步
				</a-button>
			</template>
			<template v-if="active === 1">
				<a-form
					label-position="right"
					ref="ruleFormRef"
					class="forget-form-wrap"
					:rules="formRules"
					size="large"
					:model="form"
					label-width="96px">
					<a-form-item label="手机号" filed="phoneNum" required v-if="whichMethod === 0">
						<a-input v-model="form.emailNum" clearable placeholder="请输入手机号">
							<template #prefix><icon-phone /></template>
						</a-input>
					</a-form-item>
					<a-form-item label="邮箱" filed="emailNum" required v-if="whichMethod === 1">
						<a-input v-model="form.emailNum" clearable placeholder="请输入邮箱">
							<template #prefix><icon-email /></template>
						</a-input>
					</a-form-item>

					<a-form-item label="新密码" filed="newPassword" required>
						<a-input-password
							v-model="form.newPassword"
							:defaultVisibility="true"
							allow-clear
							placeholder="请输入新密码">
							<template #prefix><icon-lock /></template>
						</a-input-password>
					</a-form-item>
					<a-form-item :label="whichMethod === 0 ? '手机验证码' : '邮箱验证码'" required filed="emailValid">
						<div class="form-valid-wrap mb-16px">
							<a-input v-model="form.emailValid" clearable placeholder="请输入验证码">
								<template #prefix><icon-message /></template>
							</a-input>
							<a-button :loading="isValidLoading" class="ml-12px" @click="flashEmailValidCode">
								发送
							</a-button>
						</div>
					</a-form-item>
				</a-form>

				<div>
					<a-button type="primary" status="success" size="large" @click="handleLastStep(true)">
						上一步
					</a-button>
					<a-button type="primary" class="ml-32px" size="large" @click="handleResetPassword(ruleFormRef)">
						重设密码
					</a-button>
				</div>
			</template>
			<template v-if="active === 2">
				<div class="guide-dash-wrap">
					<icon-check class="check-icon" />
					<text class="mt-40px">密码已重新设置,{{ countDownTime }}秒后自动跳转到面板页面</text>
					<text class="mt-24px">
						如果未自动跳转,请手动
						<a-button link @click="gotoDash" type="primary">点击跳转</a-button>
					</text>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getEmailValidCode } from '@/services/captchas.api';
import type { IForgetLoginForm } from '@/services/interfaces/users';
import { postUserForgetPassword } from '@/services/users.api';
import { InputPassword as AInputPassword, Notification, type FormInstance } from '@arco-design/web-vue';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const emits = defineEmits(['changeStatus']);
const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const active = ref(0); // 步骤条
const whichMethod = ref(0); // 使用什么找回密码(0:手机号找回，1:邮箱找回)
const emailRex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; // 邮箱正则校验
const isValidLoading = ref(false); // 获取验证码loading状态
const countDownTime = ref(3); // 倒计时
let timer: NodeJS.Timer; // 定时器
const form: Ref<IForgetLoginForm> = ref({
	emailValid: '',
	emailNum: '',
	newPassword: ''
}); // 表单

// 校验规则
// <IForgetLoginForm>>
const formRules = ref({
	emailNum: [
		{ required: true, message: '邮箱必填', trigger: 'blur' },
		{
			pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
			message: '邮箱错误',
			trigger: 'blur'
		}
	],
	emailValid: [
		{ required: true, message: '手机验证码必填', trigger: 'blur' },
		{ len: 6, message: '手机验证码错误', trigger: 'blur' }
	],
	newPassword: [
		{ required: true, message: '密码必填', trigger: 'blur' },
		{ min: 3, max: 10, message: '密码长度未3-10', trigger: 'blur' }
	]
}); // 校验规则

// 重设密码
const handleResetPassword = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl?.validate(() => {
		postUserForgetPassword(form.value)
			.then(() => {
				Notification.success({ content: '修改密码成功' });
				active.value++;
				timer = setInterval(() => {
					countDownTime.value--;
				}, 1000);
				setTimeout(() => {
					clearInterval(timer as NodeJS.Timeout);
					console.log(countDownTime.value);
					void gotoDash();
				}, 3000);
			})
			.catch((e) => {
				console.log('error', e);
			});
	});
};

// 获取邮箱验证码
const flashEmailValidCode = () => {
	if (emailRex.test(form.value.emailNum)) {
		isValidLoading.value = !isValidLoading.value;
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		void getEmailValidCode(form.value.emailNum)
			.then(() => Notification.success({ content: '发送验证码成功' }))
			.finally(() => {
				isValidLoading.value = !isValidLoading.value;
			});
	} else {
		Notification.error({ content: '邮箱不正确' });
	}
};

// 重置表单
const clearForm = () => {
	form.value.emailNum = '';
	form.value.emailValid = '';
	form.value.newPassword = '';
};

// 回到上一步
const handleLastStep = (isClearForm = false) => {
	active.value--;
	isClearForm && clearForm();
};

// 跳转到面板页面
const gotoDash = async () => {
	// await router.push({ path: '/pc/dash' });
	router.push('/pc/hfs-index');
};
</script>

<style lang="less" scoped>
.forget-password-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 32px 32px;
	box-sizing: border-box;

	.forget-password-step-wrap {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 350px;
		padding-top: 50px;

		.forget-icon-radius-box {
			position: relative;
			border: 2px solid #79bbff;
			padding: 24px;
			border-radius: 80px;
			transition: 0.5s;
			cursor: pointer;

			&:hover {
				transform: scale(1.1);
			}
		}

		.guide-dash-wrap {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.check-icon {
				width: 64px;
				height: 64px;
				font-size: 48px;
				font-weight: bold;
				border-radius: 50%;
				background-color: #95d475;
				color: #fff;
				margin-top: 32px;
			}
		}
	}

	.forget-icon-text {
		font-size: 24px;
	}

	.forget-form-wrap {
		width: 80%;
		margin: 32px auto;

		// 验证码
		.form-valid-wrap {
			display: flex;
			justify-content: space-between;
			width: 100%;
			line-height: 0;

			.valid-wrap {
				width: 108px;
				margin-left: 12px;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-self: center;
			}
		}
	}
}
</style>
