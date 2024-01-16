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

    <div class="layout">
      <div class="layout-nav">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item class="nav-item" to="/pc/dash">/面板</el-breadcrumb-item>

        </el-breadcrumb>
      </div>
      <section class="layout-inner">
        <router-view/>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { type IMenuItem } from './type.ts'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

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
const route = useRoute()
console.log(route)

</script>

<style lang="less" scoped>
.index {
  display: flex;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
  }

  .layout {
    width: 100%;
    display: flex;
    flex-direction: column;

    .layout-nav {
      height: 48px;
      line-height: 48px;
      display: flex;
      align-items: center;
      background-color: #f6f6f9;
      padding-left: 12px;

      .nav-item :hover {
        transition: 0.3s;
        font-size: 16px;

        &:hover {
          cursor: pointer;
          font-weight: bolder;
        }
      }
    }

    .layout-inner {
      margin: 12px;
    }
  }
}

</style>
