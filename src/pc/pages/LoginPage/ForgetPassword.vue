<!--
* DONE
* @description: forgetPassword 组件
* @author: tutu
* @time: 2024/1/31 17:48
-->
<template>
  <div class="forget-password-wrap">
    <el-steps :active="active" class="w-full" finish-status="success">
      <el-step title="Step 1"/>
      <el-step title="Step 2"/>
      <el-step title="Step 3"/>
    </el-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

</script>

<style lang="less" scoped>
.forget-password-wrap {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
