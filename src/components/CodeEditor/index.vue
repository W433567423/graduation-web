<template>
	<el-select v-model="selectValue" @change="handleChangeLang" placeholder="Select" style="width: 240px">
		<el-option v-for="item in options" :key="item" :label="item" :value="item" />
	</el-select>
	<div class="main">
		<code-mirror basic :lang="lang" v-model="originCode" style="height: 400px" :extensions="extensions" />
	</div>
</template>
<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';
const selectValue = ref('json'); // 编辑器的语言
const originCode = ref('');
const options = ['json', 'javascript', 'python', 'sql'];
// javascript
const lang = ref(json());
// 扩展
const extensions = [oneDark];
const handleChangeLang = (e: string) => {
	switch (e) {
		case 'json':
			json();
			break;
		case 'javascript':
			javascript();
			break;
	}
};
</script>
<style>
.main {
	width: 100%;
	height: 100%;
}
/* required! */
.cm-editor {
	height: 100%;
}
</style>
