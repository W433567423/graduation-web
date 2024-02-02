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
        label-position="top"
        ref="ruleFormRef"
        class="forget-form-wrap"
        :rules="formRules"
        size="large"
        :model="form"
      >
        <el-form-item
          label="手机号"
          prop="phoneNum"
          required
          v-if="whichMethon === 0"
        >
          <el-input
            v-model="form.phoneNum"
            :prefix-icon="Phone"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
          required
          v-if="whichMethon === 1"
        >
          <el-input
            v-model="form.email"
            :prefix-icon="Message"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <el-form-item label="验证码" prop="valida" required>
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
      </el-form>

      <div class="">
        <el-button type="warning" size="large" @click="active--">
          上一步
        </el-button>
        <el-button
          type="primary"
          class="ml-32px"
          size="large"
          @click="handleNextStep(ruleFormRef)"
        >
          下一步
        </el-button>
      </div>
    </div>
    <div v-if="active === 2">
      <el-form
        label-position="top"
        ref="ruleFormRef"
        class="forget-form-wrap"
        :rules="formRules"
        size="large"
        :model="form"
      ></el-form>

      <el-button
        type="primary"
        class="next-button"
        size="large"
        @click="handleResetPassword(ruleFormRef)"
      >
        重设密码
      </el-button>
    </div>
    <div v-if="active === 3">scsc</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onBeforeMount, defineEmits } from 'vue'
import { type IForgetLoginForm } from '@/services'
import { Key, Phone, Message } from '@element-plus/icons-vue'
import { getValidaCode } from '@/services/user.api'
import { type FormRules, type FormInstance } from 'element-plus'

const emits = defineEmits(['changeStatus'])

const ruleFormRef = ref<FormInstance>()
const active = ref(0) // 步骤条
const imgSrc = ref('') // 验证码
const whichMethon = ref(0) // 使用什么找回密码(0:手机号找回，1:邮箱找回)
const form: Ref<IForgetLoginForm> = ref({
  email: '',
  phoneValida: '',
  valida: '',
  phoneNum: ''
}) // 表单

// 校验规则
const formRules = ref<FormRules<IForgetLoginForm>>({
  email: [
    { required: true, message: '邮箱必填', trigger: 'blur' },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: '邮箱错误',
      trigger: 'blur'
    }
  ],
  valida: [
    { required: true, message: '验证码必填', trigger: 'blur' },
    { len: 4, message: '验证码错误', trigger: 'blur' }
  ],
  phoneValida: [
    { required: true, message: '手机验证码必填', trigger: 'blur' },
    { len: 6, message: '手机验证码错误', trigger: 'blur' }
  ],
  phoneNum: [
    {
      required: true,
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '手机号不正确',
      trigger: 'blur'
    }
  ]
}) // 校验规则

const flashValidaCode = async () => {
  const res = await getValidaCode()
  imgSrc.value = res as any
}

const handleNextStep = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  void formEl.validate((valid) => {
    if (valid) {
      active.value++
    }
  })
}
const handleResetPassword = (formEl: FormInstance | undefined) => {
  // if (!formEl) return
  console.log(formEl, form.value)
}

onBeforeMount(() => {
  void flashValidaCode()
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
