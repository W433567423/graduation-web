<!--
* DONE
* @description: 新建文件 表单 组件
* @author: tutu
* @time: 2024-03-12 11:04:49
-->
<template>
	<a-form :model="form" layout="horizontal">
		<a-form-item label="文件名称">
			<a-input v-model="form.fileName" placeholder="请输入文件名称"></a-input>
		</a-form-item>
	</a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
	fileName: ''
});

defineExpose({
	form
});
</script>

<style lang="less" scoped></style>
