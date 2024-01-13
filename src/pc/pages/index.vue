<template>
  <div class="index">
    <el-menu
        class="el-menu-vertical-demo"
        default-active="1">
      <template v-for="(e,i) in menuList" :key="i+1">
        <el-menu-item :index="String(i+1)">
          <el-icon>
            <component :is="e.icon"/>
          </el-icon>
          <template #title>{{ e.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { type IMenuItem } from './type.ts'

const menuList: Ref<IMenuItem[]> = ref([{
  title: '面板',
  link: '/',
  icon: 'menu'
}, {
  title: '新建项目',
  link: '/',
  icon: 'plus'
}, {
  title: '设置',
  link: '/',
  icon: 'setting'
}])

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
