<!--
* DONE
* @description: index 组件
* @author: tutu
* @time: 2024/1/29 10:12
-->
<template>
  <div class="login-page">
    <div class="login-dialog">
      <div class="login-dialog-left">
        <div class="login-text">Login</div>
        <el-form ref="ruleFormRef" :model="form" :rules="formRules" class="form-wrap"
                 label-position='left' label-width="72px"
                 size="large">
          <el-form-item label="账户名" required>
            <el-input v-model="form.username"
                      :prefix-icon="User" clearable
                      placeholder="请输入账号名"/>
          </el-form-item>

          <el-form-item label="密码" required>
            <el-input v-model="form.password"
                      :prefix-icon="Lock"
                      clearable
                      placeholder="请输入密码" show-password
                      type="password"/>
          </el-form-item>

          <el-form-item label="验证码" required>
            <div class="form-valida-wrap">
              <el-input v-model="form.valida" :prefix-icon="Key" clearable
                        placeholder="请输入验证码"/>
              <div class="valida-wrap" @click="flashValidaCode" v-html="imgSrc">
              </div>
            </div>
          </el-form-item>

          <div class="form-extra-wrap">
            <div class="remember-wrap">
              <el-checkbox v-model="isRemember" @change="handleChangeRemember">记住我</el-checkbox>
            </div>
            <router-link to="">Forget Password</router-link>
          </div>

          <div class="form-submit-wrap">

            <el-button round type="success" @click="userLogin(ruleFormRef)">登录</el-button>
          </div>
        </el-form>

        <div class="registry-wrap">没有账号？
          <router-link to="">去注册</router-link>
        </div>
      </div>

      <div class="login-dialog-right">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, type Ref, ref } from 'vue'
import { getValidaCode, postUserLogin } from '@/services/user.api.ts'
import { User, Lock, Key } from '@element-plus/icons-vue'
import { getLocalStorage, setLocalStorage } from '@/utils'
import type { IUserLogin } from '@/services'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import useUserStore from '@/stores/user.ts'

const userStore = useUserStore()

const ruleFormRef = ref<FormInstance>()

const form: Ref<IUserLogin> = ref({
  username: '',
  password: '',
  valida: ''
})
const isRemember = ref(false)
const imgSrc = ref('')

const formRules = ref<FormRules<IUserLogin>>({
  username: [
    { required: true, message: '用户名必填', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度未3-10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码必填', trigger: 'blur' },
    { min: 3, max: 10, message: '密码长度未3-10', trigger: 'blur' }
  ],
  valida: [
    { required: true, message: '验证码必填', trigger: 'blur' },
    { len: 4, message: '验证码不正确', trigger: 'blur' }
  ]
})

// 刷新验证码
const flashValidaCode = async () => {
  const res = await getValidaCode()
  imgSrc.value = res as any
}

// 登录功能
const userLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid) => {
    if (!valid) {
      return ElMessage.error({ message: '校验未通过' })
    }
  })

  const { username, password } = form.value
  const token = await postUserLogin(form.value) as any
  userStore.setToken(token as string)
  if (token) ElMessage.success({ message: '登陆成功' })
  setLocalStorage('user', { username, password })
}

// 缓存记住我
const handleChangeRemember = (value: string | number | boolean) => {
  setLocalStorage('isRemember', String(value))
}

// 初始化
const init = () => {
  isRemember.value = Boolean(getLocalStorage('isRemember') === 'true')
  if (isRemember.value) {
    const userStorage = getLocalStorage('user')
    if (userStorage instanceof Object) {
      try {
        form.value = userStorage
      } catch (e) {
        console.log(e)
      }
    }
  }
}

onBeforeMount(() => {
  void flashValidaCode()
  init()
})

</script>

<style lang="less" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url("@/assets/images/login-bg.jpg");
  background-size: cover;
  overflow: hidden;

  .login-dialog {
    width: 900px;
    height: 640px;
    display: flex;

    .login-dialog-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 32px 12px;
      //登录文案
      .login-text {
        padding: 42px 0;
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 12px;
        color: #6c6c6c;
      }

      .form-wrap {
        width: 80%;
        // 验证码
        .form-valida-wrap {
          display: flex;
          justify-content: space-between;
          width: 100%;
          line-height: 0;

          .valida-wrap {
            width: 100px;
            margin-left: 16px;
            cursor: pointer;
          }
        }

        //记住用户/忘记密码
        .form-extra-wrap {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        //登录按钮
        .form-submit-wrap {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }
      }

      .registry-wrap {
        margin-top: 32px;
      }

    }

    .login-dialog-right {
      width: 50%;
      background: url("@/assets/images/login-column-bg.jpg");
      background-size: cover;

    }
  }
}
</style>
