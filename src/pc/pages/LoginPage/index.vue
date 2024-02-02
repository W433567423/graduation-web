<!--
* DONE
* @description: index 组件
* @author: tutu
* @time: 2024/1/29 10:12
-->
<template>
  <div class="login-page">
    <!--登录注册-->
    <el-card body-class="login-dialog" shadow="hover">
      <template v-if="!forgetPage">
        <div class="login-dialog-left">
          <LoginForm @change-page="forgetPage = !forgetPage" />
        </div>

        <div class="login-dialog-right"></div>
      </template>
      <!--    忘记密码-->
      <ForgetPassword v-else @change-status="forgetPage = !forgetPage" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElCard } from "element-plus";
import LoginForm from "./cpns/LoginForm.vue";
import ForgetPassword from "@pc/pages/LoginPage/ForgetPassword.vue";

const forgetPage = ref(true); // 是否是忘记密码页面
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

  :deep(.el-card) {
    border: none;
    border-radius: 8px;

    .login-dialog {
      width: 810px;
      aspect-ratio: 3/2;
      display: flex;
      padding: 0;
      overflow: hidden;

      .login-dialog-left {
        width: 50%;
        height: 100%;
      }

      .login-dialog-right {
        width: 50%;
        background: url("@/assets/images/login-column-bg.jpg");
        background-size: cover;
      }
    }
  }

  :deep(.is-hover-shadow:hover) {
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.32);
  }
}
</style>
