<!--
* TODO
* @description: TarBar 组件
* @author: tutu
* @time: 2024/1/13 11:27
-->
<template>
  <div class="tar-bar">
    <div v-for="(e) in menuList">
      <router-link :class="['link-box',route.path===e.link?'active':'']" :to="e.link">{{
          e.title
        }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IMenuItem} from "./index";
import {useRoute} from "vue-router";

const menuList: IMenuItem[] = [
  {title: '首页', link: '/'},
  {title: '可视化', link: '/result'},
  {title: '设置', link: '/setting'}
]
const route = useRoute()
console.log(route.path)

</script>

<style lang="less" scoped>
.tar-bar {
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  border-top: 1px solid;

  .link-box {
    height: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 8px 12px;
    border-radius: 4px;
    line-height: 50px;
  }

  .active {
    background-color: #edeff6;
  }
}

//.tar-bar .link-box {
//  text-decoration: none;
//  color: #000;
//}
</style>
