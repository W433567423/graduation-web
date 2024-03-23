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
	<!-- <a-modal width="80vw" v-model:visible="codeVisible" title-align="start" :onClose="handleClearModal">
		<template #title>
			<text class="font-600">项目名称:</text>
			{{ projectVal?.projectName }}
		</template>
<a-scrollbar style="max-height: 72vh; overflow: auto">
	<CodeEditor ref="codeEditorRef" />
</a-scrollbar>

<template #footer>
			<div class="modal-footer-wrap">
				<a-spin :loading="isLoading">
					<div class="code-result-wrap">
						<a-scrollbar style="max-height: 100px; overflow: auto" ref="resultScrollRef">
							<div
								v-for="(e, i) in codeResultList"
								:key="i"
								:class="e.status ? 'success-result' : 'err-result'">
								<div class="w20px">{{ e.status ? '[+]' : '[!]' }}</div>
								<div class="mr-8px">{{ e.date }}</div>
								<div v-if="typeof e.message === 'string'">{{ e.message }}</div>
								<div v-else-if="typeof e.message === 'object'">
									<div v-for="(item, index) in e.message" :key="index">{{ item }}</div>
								</div>
							</div>
						</a-scrollbar>
					</div>
				</a-spin>

				<div>
					<a-button @click="codeResultList = []" v-if="codeResultList.length">
						<icon-delete />
						清空运行结果
					</a-button>
					<a-button @click="codeVisible = false">取消(不保存)</a-button>
					<a-button status="success" @click="runCode(projectVal!.id)" :loading="isLoading">运行</a-button>
					<a-button type="primary" @click="saveCode">保存</a-button>
				</div>
			</div>
		</template>
</a-modal> -->
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
		query: { rootFolderId: project.rootWorkFoldId }
	});
};

onBeforeMount(async () => {
	await flashList();
});
</script>

<style lang="less" scoped>
.main-contain-wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 112px);
}

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
