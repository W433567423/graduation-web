<template>
  <a-layout>
    <a-layout-header class="index-header">
      <a-dropdown>
        <img
          alt=""
          class="header-avatar-img"
          src="@/assets/images/avatar.jpg"
        />
        <a-doption>个人资料</a-doption>
        <a-doption>其他功能</a-doption>
        <a-doption divided @click="handleLogout">退出登录</a-doption>
      </a-dropdown>
    </a-layout-header>

    <a-layout>
      <a-layout-sider width="240px">
        <a-menu class="a-menu-vertical-demo" default-active="1" router>
          <template v-for="e in menuList" :key="e.id">
            <a-menu-item :index="e.link">
              <a-icon>
                <component :is="e.icon" />
              </a-icon>
              <template #title>{{ e.title }}</template>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>

      <a-layout-content class="p0!">
        <bread-nav />
        <main class="main-contain-wrap">
          <router-view />
        </main>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import router from '@/router'
import useUserStore from '@/stores/user.ts'
import { Message } from '@arco-design/web-vue'
import breadNav from '@pc/components/BreadNav/index.vue'
import { ref, type Ref } from 'vue'
import { type IMenuItem } from './type.ts'

const userStore = useUserStore()

const menuList: Ref<IMenuItem[]> = ref([
  {
    id: 0,
    title: '面板',
    link: 'dash',
    icon: 'menu'
  },
  {
    id: 1,
    title: '新建项目',
    link: 'new',
    icon: 'plus'
  },
  {
    id: 2,
    title: '设置',
    link: 'set',
    icon: 'setting'
  }
])

// 退出登录
const handleLogout = async () => {
  userStore.clearToken()
  await router.replace('/pc-login')
  Message.success({ content: '退出登录成功' })
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
    transition: 0.5s;
    cursor: pointer;
  }

  .header-avatar-img:hover {
    transform: rotate(360deg);
  }
}

.a-menu-vertical-demo:not(.a-menu--collapse) {
  height: calc(100vh - 64px);
}

.main-contain-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 112px);
}
</style>
