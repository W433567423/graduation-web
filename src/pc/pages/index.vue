<template>
  <div class="index">
    <el-menu class="el-menu-vertical-demo"
             default-active="1"
             router>
      <template v-for="e in menuList" :key="e.id">
        <el-menu-item :index="e.link">
          <el-icon>
            <component :is="e.icon"/>
          </el-icon>
          <template #title>{{ e.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
    <section class="layout">
      <router-view/>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { type IMenuItem } from './type.ts'

const menuList: Ref<IMenuItem[]> = ref([{
  id: 0,
  title: '面板',
  link: 'dash',
  icon: 'menu'
}, {
  id: 1,
  title: '新建项目',
  link: 'new',
  icon: 'plus'
}, {
  id: 2,
  title: '设置',
  link: 'set',
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

  .layout {
    margin: 12px;
    width: 100%;
  }
}

</style>
