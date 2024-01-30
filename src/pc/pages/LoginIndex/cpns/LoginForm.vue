<!--
* DONE
* @description: 登录 组件
* @author: tutu
* @time: 2024/1/30 17:09
-->
<template>
  <div class="login-form-wrap">
    <div class="login-text">Login</div>
    <el-form ref="ruleFormRef" :model="form" :rules="formRules" class="form-wrap"
             label-position='left' label-width="72px"
             size="large">
      <el-form-item label="账户名" prop="username" required>
        <el-input v-model="form.username"
                  :prefix-icon="User" clearable
                  placeholder="请输入账号名"/>
      </el-form-item>

      <el-form-item label="密码" prop="password" required>
        <el-input v-model="form.password"
                  :prefix-icon="Lock"
                  clearable
                  placeholder="请输入密码" show-password
                  type="password"/>
      </el-form-item>

      <el-form-item label="验证码" prop="valida" required>
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
        <router-link to="">忘记密码</router-link>
      </div>

      <div class="form-submit-wrap">

        <el-button class="login-button" round type="success"
                   @click="userLogin(ruleFormRef)">登录
        </el-button>
      </div>
    </el-form>

    <div class="registry-wrap">没有账号？
      <router-link to="">去注册</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Key, Lock, User } from '@element-plus/icons-vue'
import useUserStore from '@/stores/user.ts'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { type Ref, ref, onBeforeMount } from 'vue'
import { type IUserLogin } from '@/services'
import { getValidaCode, postUserLogin } from '@/services/user.api.ts'
import { getLocalStorage, setLocalStorage } from '@/utils'

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
const userLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  void formEl.validate(async (valid) => {
    if (valid) {
      const { username, password } = form.value
      const token = await postUserLogin(form.value) as any
      if (token) {
        userStore.setToken(token as string)
        ElMessage.success({ message: '登陆成功' })
        setLocalStorage('user', { username, password })
      }
    }
  })
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
.login-form-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 24px 12px;
  background-color: #fff;
  user-select: none;

  //登录文案
  .login-text {
    padding: 36px 0;
    font-weight: bold;
    font-size: 32px;
    color: #6c6c6c;
  }

  .form-wrap {
    width: 90%;
    // 验证码
    .form-valida-wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;
      line-height: 0;

      .valida-wrap {
        width: 100px;
        margin-left: 12px;
        cursor: pointer;
      }
    }

    //记住用户/忘记密码
    .form-extra-wrap {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    //登录按钮
    .form-submit-wrap {
      margin-top: 24px;
      display: flex;
      justify-content: center;
    }
  }

  .login-button {
    width: 100px;

  }

  .registry-wrap {
    margin-top: 32px;
  }
}
</style>
