<!--
* DONE
* @description: DashBoard 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
	<bread-nav />
	<main class="main-contain-wrap">
		<program-table :list="list" @update:list="flashList" @edit:project="editCode" />
	</main>
	<a-modal width="80vw" v-model:visible="codeVisible" title-align="start" :onClose="handleClearModal">
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
	</a-modal>
</template>

<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor/index.vue';
import type { IProjectListItem, IRunProjectResultError } from '@/services/interfaces/projects';
import { getProjectList, patchProjectCode, postProjectCode } from '@/services/projects.api';
import { mapListProjects } from '@/utils';
import { Notification } from '@arco-design/web-vue';
import breadNav from '@pc/components/BreadNav/index.vue';
import ProgramTable from '@pc/components/ProgramTable/index.vue';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IRunProjectResultMessage } from './index';

const router = useRouter();
const emit = defineEmits(['update:wrap']);

const list: Ref<IProjectListItem[]> = ref([]); // 项目列表

const total = ref(0); // 项目总数
const codeVisible = ref(false); // 项目总数
const projectVal = ref<IProjectListItem>();
const codeResultList: Ref<IRunProjectResultMessage[]> = ref([]); // 运行结果
const isLoading = ref(false);
const resultScrollRef = ref();

// 刷新列表数据
const flashList = async () => {
	const res = await getProjectList(0, 50);
	list.value = mapListProjects(res.list);
	total.value = res.total;
};

// 打开编辑代码的弹框
const editCode = async (project: IProjectListItem) => {
	await router.push({ path: `/pc/code`, query: { id: project.id } });
	emit('update:wrap');
	// projectVal.value = project;
	// codeVisible.value = true;
	// const code = await getProjectCode(project.id);
	// codeEditorRef.value.changeCode(code);
};

// 运行代码
const runCode = async (projectId: number) => {
	if (isLoading.value) return;

	isLoading.value = true;
	const res = await postProjectCode(projectId, codeEditorRef.value.codeVal, 'JavaScript');
	const resultData: IRunProjectResultMessage = {
		status: res.codeStatus,
		message: '',
		date: res.codeRunDate
	};
	if (res.codeStatus) {
		resultData.message = res.codeResult as string[];
		Notification.success({ content: '代码保存成功' });
	} else {
		resultData.message = `${(res.codeResult as IRunProjectResultError).name}:${(res.codeResult as IRunProjectResultError).message}`;
	}
	codeResultList.value.push(resultData);
	// 滚动到最底部
	// resultScrollRef.value.scrollTo(9999);
	isLoading.value = false;
};

// 保存代码
const saveCode = async () => {
	await patchProjectCode(projectVal.value!.id, codeEditorRef.value.codeVal);
	Notification.success({ content: '修改代码成功' });
	codeVisible.value = false;
};
// 清空运行结果
const handleClearModal = () => {
	codeResultList.value = [];
	projectVal.value = undefined;
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
	// 左侧打印运行结果区域
	.code-result-wrap {
		text-align: left;
		.err-result,
		.success-result {
			display: flex;
			max-width: 400px;
			color: red;
			& > div {
				text-align: justify;
				text-align-last: justify;
				text-wrap: nowrap;
				margin-right: 8px;
			}
			&:not(:last-child) {
				border-bottom: 1px dashed #e8e8e8;
			}
		}
		.success-result {
			color: green;
		}
	}
	// 右侧操作按钮区域
	button {
		margin-left: 8px;
	}
}
</style>
