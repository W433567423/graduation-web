<!--
* DONE
* @description: DashBoard 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
	<div class="dash-board">
		<program-item :list="list" @update:list="flashList" />
	</div>
</template>

<script lang="ts" setup>
import type { IProjectListItem } from '@/services/interfaces/projects';
import { getProjectList } from '@/services/projects.api';
import { mapListProjects } from '@/utils';
import ProgramItem from '@pc/components/ProgramItem/index.vue';
import { onBeforeMount, ref, type Ref } from 'vue';

const defaultList = [
	{
		id: 0,
		projectName: '示例项目1',
		lastStatus: 0,
		createTime: '创建时间',
		updateTime: '上次运行时间'
	},
	{
		id: 1,
		projectName: '示例项目2',
		lastStatus: 0,
		createTime: '创建时间',
		updateTime: '上次运行时间'
	}
];

const list: Ref<IProjectListItem[]> = ref(defaultList); // 项目列表

const total = ref(0); // 项目总数

// 刷新列表数据
const flashList = async () => {
	const res = await getProjectList(0, 50);
	list.value = res.list.length ? mapListProjects(res.list) : defaultList;
	total.value = res.total;
};

onBeforeMount(async () => {
	// Spin.service()
	await flashList();
});
</script>

<style lang="less" scoped>
.dash-board {
	width: 100%;
	height: calc(100vh - 152px);
}
</style>
