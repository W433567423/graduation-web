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
    <div v-if="active === 0">
      <el-form
        ref="ruleFormRef"
        class="w-80% m-a"
        :rules="formRules"
        size="large"
        :model="form"
      >
        <el-form-item label="账号名" prop="username" required>
          <el-input
            v-model="form.username"
            :prefix-icon="User"
            clearable
            placeholder="请输入账号名"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="password" required>
          <el-input
            v-model="form.phoneNum"
            :prefix-icon="Phone"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="password" required>
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
    </div>
    <div v-if="active === 1">ads</div>
    <div v-if="active === 2">scsc</div>
    <el-button
      type="primary"
      class="next-button"
      @click="handleNextStep(ruleFormRef)"
    >
      next
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onBeforeMount } from "vue";
import { IForgetLoginForm } from "@/services";
import { Key, User, Phone } from "@element-plus/icons-vue";
import { getValidaCode } from "@/services/user.api";
import { type FormRules, type FormInstance } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const active = ref(0); // 步骤条
const imgSrc = ref(""); // 验证码
const form: Ref<IForgetLoginForm> = ref({
  username: "",
  valida: "",
  phoneNum: "",
}); // 表单

const formRules = ref<FormRules<IForgetLoginForm>>({
  username: [
    { required: true, message: "用户名必填", trigger: "blur" },
    { min: 3, max: 10, message: "用户名长度未3-10", trigger: "blur" },
  ],
  valida: [
    { required: true, message: "验证码必填", trigger: "blur" },
    { len: 4, message: "验证码错误", trigger: "blur" },
  ],
  phoneNum: [
    { required: true, message: "手机号必填", trigger: "blur" },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "手机号不正确",
      trigger: "blur",
    },
  ],
}); // 校验规则

const flashValidaCode = async () => {
  const res = await getValidaCode();
  imgSrc.value = res as any;
};

const handleNextStep = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  console.log(formEl.validate);

  formEl.validate((valid) => {
    if (valid) {
      active.value++;
    }
  });
};

onBeforeMount(() => {
  flashValidaCode();
});
</script>

<style lang="less" scoped>
.forget-password-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
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
  .next-button {
    position: absolute;
    bottom: 100px;
    left: 50%;
  }
}
</style>
