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
        <LoginForm/>
      </div>

      <div class="login-dialog-right">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import LoginForm from '@pc/pages/LoginIndex/cpns/LoginForm.vue'
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
    width: 760px;
    height: 510px;
    display: flex;
    box-shadow: rgba(17, 17, 26, 0.1) 0 4px 16px,
    rgba(17, 17, 26, 0.1) 0 8px 24px,
    rgba(17, 17, 26, 0.1) 0 16px 56px;
    border-radius: 4px;
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
</style>
