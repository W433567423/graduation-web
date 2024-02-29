<template>
	<div class="code-editor">
		<code-mirror
			basic
			:lang="lang"
			v-model="codeVal"
			:style="props.isFullHeight ? 'height: 100%' : ''"
			:extensions="extensions" />
	</div>
</template>

<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const props = defineProps({
	isFullHeight: {
		type: Boolean,
		default: true
	}
});

const codeVal = ref('');
// javascript
const lang = javascript();
// 扩展
const extensions = [oneDark];

// 改变代码（暴露出去使用）
const changeCode = (code: string) => {
	codeVal.value = code;
};

defineExpose({ codeVal, changeCode });
</script>
<style scoped lang="less">
.code-editor {
	width: 100%;
	height: 100%;
	/* required! */
	:deep(.cm-editor) {
		height: 100%;
	}
}
</style>
