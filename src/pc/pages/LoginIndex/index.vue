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
        <el-form :model="form" class="form-wrap" label-position='left' label-width="72px">
          <el-form-item label="账户名" required>
            <el-input v-model="form.username"
                      clearable/>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input v-model="form.password"
                      clearable
                      show-password
                      type="password"/>
          </el-form-item>
          <el-form-item label="验证码" required>
            <div class="form-valida-wrap">
              <el-input v-model="form.valida"
                        clearable/>
              <div class="valida-wrap">sss</div>
            </div>
          </el-form-item>
          <div class="form-extra-wrap">
            <div class="remember-wrap">
              <el-checkbox/>
              Remember me
            </div>
            <router-link to="">Forget Password</router-link>
          </div>
        </el-form>
      </div>
      <div class="login-dialog-right"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const form = ref({
  username: '',
  password: '',
  valida: ''
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
      padding: 12px;

      .login-text {
        padding: 36px 0;
        font-weight: bold;
        font-size: 21px;
        margin-bottom: 12px;
      }

      .form-wrap {
        width: 80%;

        .form-valida-wrap {
          display: flex;
          justify-content: space-between;
          width: 100%;

          .valida-wrap {
            background-color: red;
            width: 80px;
            margin-left: 16px;
          }
        }

        .form-extra-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
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
