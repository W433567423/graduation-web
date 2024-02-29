<!--
* DONE
* @description: New Project 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
	<bread-nav />
	<main class="main-contain-wrap">
		<CodeEditor />
	</main>
</template>

<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor/index.vue';
import breadNav from '@pc/components/BreadNav/index.vue';
</script>

<style lang="less" scoped>
.main-contain-wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 112px);
	.new-project {
		height: 100%;
	}
}
</style>
