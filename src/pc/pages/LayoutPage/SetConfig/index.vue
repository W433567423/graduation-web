<!--
* DONE
* @description: SetConfig 组件
* @author: tutu
* @time: 2024/1/13 16:20
-->
<template>
	<bread-nav />
	<main class="main-contain-wrap">
		<h2>SetConfig 组件</h2>
	</main>
</template>

<script lang="ts" setup>
import breadNav from '@pc/components/BreadNav/index.vue';
</script>

<style lang="less" scoped>
.main-contain-wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	height: calc(100vh - 112px);
}
</style>
