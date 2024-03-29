<!--
* DONE
* @description: DashBoard 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->

<template>
	<bread-nav />
	<main class="main-contain-wrap">
		<program-table
			:list="list"
			@update:list="flashList"
			@edit:project="editCode"
			@into:project="intoWorkSpace" />
	</main>
</template>

<script lang="ts" setup>
import type { IProjectListItemRes } from '@/services/interfaces/projects';
import { getProjectList } from '@/services/projects.api';
import { mapListProjects } from '@/utils';
import breadNav from '@pc/components/BreadNav/index.vue';
import ProgramTable from '@pc/components/ProgramTable/index.vue';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['update:wrap']);

const list: Ref<IProjectListItemRes[]> = ref([]); // 项目列表

const total = ref(0); // 项目总数
// 刷新列表数据
const flashList = async () => {
	const res = await getProjectList(0, 50);
	list.value = mapListProjects(res.list);
	total.value = res.total;
};

// 打开编辑代码的弹框
const editCode = async (project: IProjectListItemRes) => {
	await router.push({ path: `/pc/code`, query: { id: project.id } });
	emit('update:wrap');
};

//  进入工作台
const intoWorkSpace = async (project: IProjectListItemRes) => {
	await router.push({
		path: `/pc-workspace`,
		query: { parentId: project.rootWorkFoldId, projectId: project.id }
	});
};

onBeforeMount(async () => {
	await flashList();
});
</script>

<style lang="less" scoped>
.modal-footer-wrap {
	display: flex;
	justify-content: space-between;
	align-items: end;

	// 右侧操作按钮区域
	button {
		margin-left: 8px;
	}
}
</style>
