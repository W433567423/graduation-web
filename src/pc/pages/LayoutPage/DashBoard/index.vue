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
import { type IProjectListItem } from '@/services/interfaces/projects'
import { getProjectList } from '@/services/projects.api'

const list: Ref<IProjectListItem[] > = ref([{
  id: 0,
  projectName: '示例项目1',
  lastStatus: 0,
  createTime: '创建时间',
  updateTime: '上次运行时间'
}, {
  id: 1,
  projectName: '示例项目2',
  lastStatus: 0,
  createTime: '创建时间',
  updateTime: '上次运行时间'
}]) // 项目列表

const total = ref(0) // 项目总数

onBeforeMount(async () => {
  const res = await getProjectList()
  list.value = res.list
  total.value = res.total
})
</script>

<style lang="less" scoped>
.dash-board {
  width: 100%;
}
</style>
