<template>
	<div class="bread-nav">
		<a-button @click="handleClearModal" v-if="codeResultList.length">
			<icon-delete />
			清空运行结果
		</a-button>
		<a-button @click="router.back">取消(不保存)</a-button>
		<a-button status="success" @click="runCode(projectIdC)" :loading="isLoading">运行</a-button>
		<a-button type="primary" @click="saveCode">保存</a-button>
	</div>
	<main class="main-contain-wrap">
		<a-split
			direction="vertical"
			v-model:size="splitSize"
			min="80px"
			:style="{
				height: '100%',
				width: '100%'
			}">
			<template #first>
				<a-scrollbar style="overflow: auto; max-height: 100%" ref="resultScrollRef">
					<a-typography-paragraph>
						<CodeEditor ref="codeEditorRef" :is-full-height="false" />
					</a-typography-paragraph>
				</a-scrollbar>
			</template>
			<template #second v-if="codeResultList.length">
				<a-typography-paragraph>
					<a-scrollbar style="overflow: auto" ref="resultScrollRef">
						<div class="code-result-wrap">
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
						</div>
					</a-scrollbar>
				</a-typography-paragraph>
			</template>
		</a-split>
	</main>
</template>

<script setup lang="ts">
import type { IRunProjectResultError } from '@/services/interfaces/projects';
import { getProjectCode, patchProjectCode, postProjectCode } from '@/services/projects.api';
import { Scrollbar as AScrollbar, Notification } from '@arco-design/web-vue';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IRunProjectResultMessage } from './index';

const route = useRoute();
const router = useRouter();
const codeEditorRef = ref();

const splitSize = ref('0.8');

const projectIdC = computed(() => {
	return Number(route.query.id as string);
});
const codeResultList: Ref<IRunProjectResultMessage[]> = ref([]); // 运行结果
codeResultList.value.push({ status: true, message: ['1', '1'], date: '2024/02/29 14:54:04' });
codeResultList.value.push({ status: true, message: ['1', '1'], date: '2024/02/29 14:54:04' });
codeResultList.value.push({ status: true, message: ['1', '1'], date: '2024/02/29 14:54:04' });
codeResultList.value.push({ status: true, message: ['1', '1'], date: '2024/02/29 14:54:04' });
const isLoading = ref(false);
// const resultScrollRef = ref();

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
	console.log('🚀 ~ runCode ~ resultData:', JSON.stringify(resultData));
	// 滚动到最底部
	// resultScrollRef.value.scrollTo(9999);
	isLoading.value = false;
};

// 保存代码
const saveCode = async () => {
	await patchProjectCode(projectIdC.value, codeEditorRef.value.codeVal);
	Notification.success({ content: '修改代码成功' });
};
// 清空运行结果
const handleClearModal = () => {
	codeResultList.value = [];
};

onMounted(async () => {
	const code = await getProjectCode(projectIdC.value);
	console.log('🚀 ~ onBeforeMount ~ code:', code);
	codeEditorRef.value.changeCode(code);
});
</script>

<style lang="less" scoped>
.bread-nav {
	height: 48px;
	line-height: 48px;
	display: flex;
	align-items: center;
	background-color: #f6f6f9;
	justify-content: end;
	padding-right: 20px;
}
.main-contain-wrap {
	width: calc(100% - 40px);
	height: calc(100vh - 152px);
	box-sizing: border-box;
	margin: 20px;
	overflow: hidden;
	:deep(.arco-split-pane-first) {
		background-color: #282c34;
	}
	:deep(.arco-split-pane) {
		background-color: #23272e7e;
		.arco-scrollbar {
			height: 100%;
		}
		.arco-typography {
			height: 100%;
			margin: 0;
			.arco-scrollbar {
				height: 100%;
				.arco-scrollbar-container {
					height: 100%;
				}
			}
		}
	}
	// 打印代码结果
	.code-result-wrap {
		max-height: 100%;
		text-align: left;
		.err-result,
		.success-result {
			display: flex;
			width: 100%;
			color: red;
			border-bottom: 1px dashed #e8e8e8;
			& > div {
				text-align: justify;
				text-align-last: justify;
				text-wrap: nowrap;
				margin-right: 8px;
			}
		}
		.success-result {
			color: green;
		}
	}
}
</style>
