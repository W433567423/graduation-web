<template>
	<div class="bread-nav">
		<a-button @click="router.back()">取消(不保存)</a-button>
		<a-button status="success" @click="runCode(projectVal!.id)" :loading="isLoading">运行</a-button>
		<a-button type="primary" @click="saveCode">保存</a-button>
	</div>
	<main class="main-contain-wrap">
		<a-split direction="vertical">
			<template #first>
				<div>
					<CodeEditor ref="codeEditorRef" />
				</div>
			</template>
			<template #second></template>
		</a-split>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getProjectCode } from '@/services/projects.api';

const route = useRoute();
const codeEditorRef = ref();

onMounted(async () => {
	console.log('🚀 ~ route.query:', route.query);
	const projectId = route.query.id as string;
	const code = await getProjectCode(projectId);
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
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 112px);
}
</style>
