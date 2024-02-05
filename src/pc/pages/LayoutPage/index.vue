<template>
  <el-header class="index-header">
    <el-dropdown>
      <img alt="" class="header-avatar-img" src="@/assets/images/avatar.jpg">
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>其他功能</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>

  <el-container>
    <el-aside width="240px">
      <el-menu class="el-menu-vertical-demo" default-active="1" router>
        <template v-for="e in menuList" :key="e.id">
          <el-menu-item :index="e.link">
            <el-icon>
              <component :is="e.icon" />
            </el-icon>
            <template #title>{{ e.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-main class="p0!">
      <bread-nav />
      <main class="main-contain-wrap">
        <router-view />
      </main>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import router from '@/router'
import useUserStore from '@/stores/user.ts'
import breadNav from '@pc/components/BreadNav/index.vue'
import { ElMessage } from 'element-plus'
import { ref, type Ref } from 'vue'
import { type IMenuItem } from './type.ts'

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
.index-header {
  height: 64px;
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
    cursor: pointer;
  }

  .header-avatar-img:hover {
    transform: rotate(360deg);
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: calc(100vh - 64px);
}

.main-contain-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 112px);
}
</style>
