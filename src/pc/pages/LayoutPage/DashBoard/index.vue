<!--
* DONE
* @description: DashBoard 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
	<program-table :list="list" @update:list="flashList" />
</template>

<script lang="ts" setup>
import type { IProjectListItem } from '@/services/interfaces/projects';
import { getProjectList } from '@/services/projects.api';
import { mapListProjects } from '@/utils';
import ProgramTable from '@pc/components/ProgramTable/index.vue';
import { onBeforeMount, ref, type Ref } from 'vue';

const list: Ref<IProjectListItem[]> = ref([]); // 项目列表

const total = ref(0); // 项目总数

// 刷新列表数据
const flashList = async () => {
	const res = await getProjectList(0, 50);
	list.value = mapListProjects(res.list);
	total.value = res.total;
};

onBeforeMount(async () => {
	// Spin.service()
	await flashList();
});
</script>

<style lang="less" scoped></style>
