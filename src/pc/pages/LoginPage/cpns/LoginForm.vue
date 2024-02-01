<!--
* DONE
* @description: 登录 组件
* @author: tutu
* @time: 2024/1/30 17:09
-->
<template>
  <div class="login-form-wrap">
    <div class="login-text">{{ isLoginPage ? "Login" : "Registry" }}</div>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="formRules"
      class="form-wrap"
      label-position="left"
      label-width="96px"
      size="large"
    >
      <el-form-item label="账户名" prop="username" required>
        <el-input
          v-model="form.username"
          :prefix-icon="User"
          clearable
          placeholder="请输入账号名"
        />
      </el-form-item>

      <el-form-item label="密码" prop="password" required>
        <el-input
          v-model="form.password"
          :prefix-icon="Lock"
          clearable
          placeholder="请输入密码"
          show-password
          type="password"
        />
      </el-form-item>

      <el-form-item v-if="!isLoginPage" label="手机号" prop="phoneNum" required>
        <el-input
          v-model="form.phoneNum"
          :prefix-icon="Phone"
          clearable
          placeholder="请输入手机号"
        />
      </el-form-item>

      <el-form-item v-if="isLoginPage" label="验证码" prop="valida" required>
        <div class="form-valida-wrap">
          <el-input
            v-model="form.valida"
            :prefix-icon="Key"
            clearable
            placeholder="请输入验证码"
          />
          <div
            class="valida-wrap"
            @click="flashValidaCode"
            v-html="imgSrc"
            v-if="imgSrc"
          />
          <div class="valida-wrap" v-else>
            <el-image class="w-108px h-40px" />
          </div>
        </div>
      </el-form-item>

      <el-form-item v-else label="手机验证码" required>
        <div class="form-valida-wrap mb-16px">
          <el-input
            v-model="form.phoneValida"
            :prefix-icon="Key"
            clearable
            placeholder="请输入验证码"
          />
          <el-button
            :loading="isValidaLoading"
            class="ml-12px"
            @click="flashPhoneValidaCode"
          >
            发送
          </el-button>
        </div>
      </el-form-item>

      <div v-if="isLoginPage" class="form-extra-wrap">
        <div class="remember-wrap">
          <el-checkbox v-model="isRemember" @change="handleChangeRemember">
            记住我
          </el-checkbox>
        </div>
        <el-text @click="emits('changePage')">忘记密码</el-text>
      </div>

      <div class="form-submit-wrap">
        <el-button
          class="login-button"
          round
          type="success"
          @click="userLoginOrRegistry(ruleFormRef)"
        >
          {{ isLoginPage ? "登录" : "注册" }}
        </el-button>
      </div>
    </el-form>

    <div class="registry-wrap">
      {{ isLoginPage ? "没有账号？" : "已有账号" }}
      <el-text type="info" @click="changeStatus">
        {{ isLoginPage ? "去注册" : "去登录" }}
      </el-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Key, Lock, User, Phone } from '@element-plus/icons-vue'
import useUserStore from '@/stores/user.ts'
import {
  ElMessage,
  ElNotification,
  type FormInstance,
  type FormRules
} from 'element-plus'
import { type Ref, ref, onBeforeMount } from 'vue'
import { type IUserLoginForm } from '@/services'
import {
  getPhoneValidaCode,
  getValidaCode,
  postUserLogin,
  postUserRegistry
} from '@/services/user.api.ts'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const emits = defineEmits(['changePage'])

const form: Ref<IUserLoginForm> = ref({
  username: '',
  password: '',
  valida: '',
  phoneValida: '',
  phoneNum: ''
}) // 表单
const isRemember = ref(false) // 记住用户
const imgSrc = ref('') // 验证码
const isLoginPage = ref(true) // 是否登录页面（1:登录,2:注册）
const isValidaLoading = ref(false) // 获取验证码loading状态

const formRules = ref<FormRules<IUserLoginForm>>({
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
    { len: 4, message: '验证码错误', trigger: 'blur' }
  ],
  phoneNum: [
    { required: true, message: '手机号必填', trigger: 'blur' },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '手机号不正确',
      trigger: 'blur'
    }
  ]
}) // 校验规则

// 刷新验证码
const flashValidaCode = async () => {
  if (isLoginPage.value) {
    const res = await getValidaCode()
    imgSrc.value = res as any
  }
}

// 获取手机验证码
const flashPhoneValidaCode = () => {
  if (form.value.phoneNum?.length === 11) {
    isValidaLoading.value = !isValidaLoading.value
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getPhoneValidaCode(form.value.phoneNum).finally(() => {
      isValidaLoading.value = !isValidaLoading.value
    })
  } else {
    ElNotification.error({ message: '手机号码不正确' })
  }
}

// 登录功能
const userLoginOrRegistry = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  void formEl.validate(async (valid) => {
    if (valid) {
      const { username, password } = form.value
      let token = ''
      if (isLoginPage.value) {
        // 登录
        token = (await postUserLogin(form.value)) as any
      } else {
        //   注册
        token = (await postUserRegistry(form.value)) as any
      }
      if (token) {
        userStore.setToken(token)
        ElMessage.success({
          message: (isLoginPage.value ? '登录' : '注册') + '成功'
        })
        setLocalStorage('user', { username, password })
        // 登录/注册成功后跳转
        if (typeof route.query.redirect === 'string') {
          await router.replace(route.query.redirect)
        } else await router.replace('/pc/dash')
      } else await flashValidaCode()
    }
  })
}

// 缓存记住我
const handleChangeRemember = (value: string | number | boolean) => {
  setLocalStorage('isRemember', String(value))
}

// 切换登录/注册
const changeStatus = () => {
  isLoginPage.value = !isLoginPage.value
  void flashValidaCode()
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
  void flashValidaCode()
}

onBeforeMount(async () => {
  if (userStore.token) {
    // 如果有token直接去面板页面
    await router.replace('/pc/dash')
  } else {
    init()
  }
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
    font-size: 36px;
    color: #6c6c6c;
  }

  .form-wrap {
    width: 94%;
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
      margin-top: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;

      span {
        font-size: 14px;

        &:hover {
          cursor: pointer;
          color: #79bbff;
        }
      }
    }

    //登录按钮
    .form-submit-wrap {
      margin-top: 21px;
      display: flex;
      justify-content: center;

      .login-button {
        width: 120px;
        font-size: 18px;
      }
    }
  }

  // 注册区域
  .registry-wrap {
    margin-top: 32px;
    font-size: 14px;

    span:hover {
      cursor: pointer;
      color: #79bbff;
    }
  }
}
</style>
