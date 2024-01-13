<template>
  <div class="index">
    <el-menu
        class="el-menu-vertical-demo"
        default-active="2"
    >
      <el-menu-item index="1">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <template #title>新建项目</template>
      </el-menu-item>

      <el-menu-item index="2">
        <el-icon>
          <setting/>
        </el-icon>
        <template #title>设置</template>
      </el-menu-item>

      <el-menu-item index="3">
        <el-icon>
          <setting/>
        </el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  Setting
} from '@element-plus/icons-vue'

</script>

<style lang="less" scoped>
.index {
  display: flex;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
  }
}

</style>
