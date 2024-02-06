<template>
  <a-layout>
    <a-layout-header class="index-header">
      <a-dropdown>
        <a-avatar>
          <img alt="avatar" class="header-avatar-img" src="@/assets/images/avatar.jpg" /></a-avatar>
        <a-doption>个人资料</a-doption>
        <a-doption>其他功能</a-doption>
        <a-doption divided @click="handleLogout">退出登录</a-doption>
      </a-dropdown>
    </a-layout-header>

    <a-layout>
      <a-layout-sider :width="240">
        <a-menu mode="pop" showCollapseButton class="a-menu-vertical-demo" :default-selected-keys="[1]" >
            <a-menu-item  v-for="e in menuList" :key="e.id" @click="changeMune(e.link)">
                        <template #icon>
                          <!-- <component :is="h(compile(`<${e.icon}/>`)as any)" /> -->
                        </template> {{ e.title }}
            </a-menu-item>
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
import useUserStore from '@/stores/user.ts'
import { Message } from '@arco-design/web-vue'
import { IconApps, IconBug, IconPlus } from '@arco-design/web-vue/es/icon'
import breadNav from '@pc/components/BreadNav/index.vue'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { type IMenuItem } from './type'

const userStore = useUserStore()
const router = useRouter()

const menuList: Ref<IMenuItem[]> = ref([
  {
    id: 1,
    title: '面板',
    link: 'dash',
    icon: 'icon-apps'
  },
  {
    id: 2,
    title: '新建项目',
    link: 'new',
    icon: 'icon-plus'
  },
  {
    id: 3,
    title: '设置',
    link: 'set',
    icon: 'icon-bug'
  }
])
const changeMune = async (url: string) => {
  await router.replace({ path: `/pc/${url}` })
}

// 退出登录
const handleLogout = async () => {
  userStore.clearToken()
  await router.replace('/pc-login')
  Message.success({ content: '退出登录成功' })
  console.log(IconApps, IconBug, IconPlus)
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
