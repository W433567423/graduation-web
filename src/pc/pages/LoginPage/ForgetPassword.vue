<!--
* DONE
* @description: forgetPassword 组件
* @author: tutu
* @time: 2024/1/31 17:48
-->
<template>
  <div class="forget-password-wrap">
    <el-steps :active="active" class="w-full" finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
    <div v-if="active === 0" class="forget-password-step-wrap">
      <section class="flex justify-around w-100%">
        <div class="flex flex-col flex-items-center">
          <div
            class="forget-icon-radius-box mb-32px"
            @click="
              active++;
              whichMethon = 0;
            "
          >
            <el-icon size="108px" color="#79bbff"><Iphone /></el-icon>
          </div>
          <el-text class="forget-icon-text">手机号找回</el-text>
        </div>
        <div class="flex flex-col flex-items-center">
          <div
            class="forget-icon-radius-box mb-32px border-#95d475!"
            @click="
              active++;
              whichMethon = 1;
            "
          >
            <el-icon size="108px" color="#95d475">
              <Message />
            </el-icon>
          </div>
          <el-text class="forget-icon-text">邮箱找回</el-text>
        </div>
      </section>
      <el-button
        type="warning"
        class="w-80px"
        size="large"
        @click="emits('changeStatus')"
      >
        上一步
      </el-button>
    </div>
    <div v-if="active === 1" class="forget-password-step-wrap">
      <el-form
        label-position="right"
        ref="ruleFormRef"
        class="forget-form-wrap"
        :rules="formRules"
        size="large"
        :model="form"
        label-width="96px"
      >
        <el-form-item
          label="手机号"
          prop="phoneNum"
          required
          v-if="whichMethon === 0"
        >
          <el-input
            v-model="form.emailNum"
            :prefix-icon="Phone"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="emailNum"
          required
          v-if="whichMethon === 1"
        >
          <el-input
            v-model="form.emailNum"
            :prefix-icon="Message"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>

      <el-form-item label="密码" prop="newPassword" required>
        <el-input v-model="form.newPassword" :prefix-icon="Lock" clearable placeholder="请输入密码" show-password
          type="password" />
      </el-form-item>
        <el-form-item :label="whichMethon === 0?'手机验证码':'邮箱验证码'" required prop="emailValida">
        <div class="form-valida-wrap mb-16px">
          <el-input v-model="form.emailValida" :prefix-icon="Key" clearable  placeholder="请输入验证码"/>
          <el-button :loading="isValidaLoading" class="ml-12px" @click="flashEmailValidaCode">
            发送
          </el-button>
        </div>
      </el-form-item>
      </el-form>

      <div class="">
        <el-button type="warning" size="large" @click="active--">
          上一步
        </el-button>
        <el-button
          type="primary"
          class="ml-32px"
          size="large"
          @click="handleResetPassword(ruleFormRef)"
        >
          重设密码
        </el-button>
      </div>
    </div>
    <div v-if="active === 2">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onBeforeMount, defineEmits } from 'vue'
import { type IForgetLoginForm } from '@/services'
import { Key, Phone, Message, Lock } from '@element-plus/icons-vue'
import { postUserForgetPassword } from '@/services/user.api'
import { getEmailValidaCode } from '@/services/captcha.api'
import { type FormRules, type FormInstance, ElNotification } from 'element-plus'

const emits = defineEmits(['changeStatus'])

const ruleFormRef = ref<FormInstance>()
const active = ref(0) // 步骤条
const whichMethon = ref(0) // 使用什么找回密码(0:手机号找回，1:邮箱找回)
const emailRex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ // 邮箱正则校验
const isValidaLoading = ref(false) // 获取验证码loading状态
const form: Ref<IForgetLoginForm> = ref({
  emailValida: '',
  emailNum: '',
  newPassword: ''
}) // 表单

// 校验规则
const formRules = ref<FormRules<IForgetLoginForm>>({
  emailNum: [
    { required: true, message: '邮箱必填', trigger: 'blur' },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: '邮箱错误',
      trigger: 'blur'
    }
  ],
  emailValida: [
    { required: true, message: '手机验证码必填', trigger: 'blur' },
    { len: 6, message: '手机验证码错误', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '密码必填', trigger: 'blur' },
    { min: 3, max: 10, message: '密码长度未3-10', trigger: 'blur' }
  ]
}) // 校验规则

// 重设密码
const handleResetPassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl?.validate(() => {
    postUserForgetPassword(form.value).then(() => {
      ElNotification.success({ message: '修改密码成功' })
    }).catch((e) => {
      console.log('error', e)
    })
  })
}

// 获取邮箱验证码
const flashEmailValidaCode = () => {
  if (emailRex.test(form.value.emailNum)) {
    isValidaLoading.value = !isValidaLoading.value
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getEmailValidaCode(form.value.emailNum).then(() => ElNotification.success({ message: '发送验证码成功' })).finally(() => {
      isValidaLoading.value = !isValidaLoading.value
    })
  } else {
    ElNotification.error({ message: '邮箱不正确' })
  }
}
onBeforeMount(() => {
})
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
  }
  .forget-icon-text {
    font-size: 24px;
  }
  .forget-form-wrap {
    width: 80%;
    margin: 32px auto;
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
  }
}
</style>
