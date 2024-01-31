<template>
  <div class="index">

    <header class="index-header">
      <el-dropdown>
        <img alt="" class="header-avatar-img" src="@/assets/images/avatar.jpg">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
    <div class="index-inner">
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
        <bread-nav/>
        <section class="layout-inner">
          <router-view/>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { type IMenuItem } from './type.ts'
import breadNav from '@pc/components/BreadNav/index.vue'
import useUserStore from '@/stores/user.ts'
import router from '@/router'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

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

// 退出登录
const handleLogout = async () => {
  userStore.clearToken()
  await router.replace('/pc-login')
  ElMessage.success({ message: '退出登录成功' })
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;

  .index-header {
    height: 56px;
    background-color: #000;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;

    .header-avatar-img {
      width: 42px;
      height: 42px;
      border-radius: 28px;
      transition: .5s;
    }

    .header-avatar-img:hover {
      transform: rotate(360deg);
    }
  }

  .index-inner {
    width: 100%;
    display: flex;

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 280px;
      height: calc(100vh - 56px);
    }

    .layout {
      width: 100%;
      display: flex;
      flex-direction: column;

      .layout-inner {
        box-sizing: border-box;
        padding: 12px;
      }
    }
  }
}

</style>
