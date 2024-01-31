<!--
* DONE
* @description: DashBoard 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
  <div class="dash-board">
    <program-item :list="list"/>
  </div>
</template>

<script lang="ts" setup>
import ProgramItem from '@pc/components/ProgramItem/index.vue'
import { onBeforeMount, ref, type Ref } from 'vue'
import { type IProgramItem } from '@pc/pages/type.ts'
import { test } from '@/services/user.api.ts'

const list: Ref<IProgramItem[] | undefined> = ref()
onBeforeMount(() => {
  // void test()
})
</script>

<style lang="less" scoped>
.dash-board {
  width: 100%;
}
</style>
