<!--
* DONE
* @description: DashBoard 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
	<program-table :list="list" @update:list="flashList" @edit:project="editCode" />

	<a-modal width="80vw" simple v-model:visible="codeVisible" title-align="start">
		<template #title>{{ projectVal?.projectName }}</template>
		<CodeEditor ref="codeEditorRef" />
		<template #footer>
			<a-button @click="codeVisible = false">取消(不保存)</a-button>
			<a-button status="success">运行</a-button>
			<a-button type="primary" @click="saveCode">保存</a-button>
		</template>
	</a-modal>
</template>

<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor/index.vue';
import type { IProjectListItem } from '@/services/interfaces/projects';
import { getProjectCode, getProjectList } from '@/services/projects.api';
import { mapListProjects } from '@/utils';
import ProgramTable from '@pc/components/ProgramTable/index.vue';
import { onBeforeMount, ref, type Ref } from 'vue';

const list: Ref<IProjectListItem[]> = ref([]); // 项目列表

const total = ref(0); // 项目总数
const codeVisible = ref(false); // 项目总数
const projectVal = ref<IProjectListItem>();
const codeEditorRef = ref();

// 刷新列表数据
const flashList = async () => {
	const res = await getProjectList(0, 50);
	list.value = mapListProjects(res.list);
	total.value = res.total;
};

// 打开编辑代码的弹框
const editCode = async (project: IProjectListItem) => {
	projectVal.value = project;
	codeVisible.value = true;
	codeEditorRef.value.changeCode(await getProjectCode(project.id));
};

// 保存代码
const saveCode = () => {};

onBeforeMount(async () => {
	await flashList();
});
</script>

<style lang="less" scoped></style>
