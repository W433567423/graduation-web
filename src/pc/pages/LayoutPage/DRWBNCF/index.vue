<!--
* DONE
* @description: DRWBNCF 组件
* @author: tutu
* @time: 2024-03-29 12:12:39
-->
<template>
	<main class="main-contain-wrap">
		<div class="flex flex-col flex-items-center">
			<h2>A weighted bilinear neural collaborative filtering approach for drug repositioning</h2>
			<a-button @click="handleRunProject">开始诊断</a-button>
		</div>
	</main>
	<!-- 项目运行结果 -->
	<a-modal
		popup-container="#parentNode"
		:visible="runCodeVisible"
		:simple="true"
		:mask-closable="false"
		modalClass="w80vw! h80vh!"
		:body-style="{ height: 'calc(100% - 52px)' }"
		@ok="runCodeVisible = false"
		:esc-to-close="false"
		:hide-cancel="true"
		:ok-text="isSocketing ? '正在诊断中...' : '关闭'"
		:hide-title="true"
		:ok-loading="isSocketing">
		<a-scrollbar
			id="modalScrollbar"
			class="overflow-auto overflow-y-scroll w100% h100%"
			outer-class="h100%  w100%">
			<div
				v-for="(e, i) in resultArr"
				:key="i"
				:class="[
					'color-gray  w-auto flex ',
					i === 0 ? 'color-green' : '',
					i > resultArr.length - 3 ? 'color-pink' : ''
				]">
				<pre class="result-pre" v-if="e !== ' '">{{ e }}</pre>
			</div>
		</a-scrollbar>
	</a-modal>
</template>

<script lang="ts" setup>
import { getRunDrwbncf } from '@/services/drwbncf.api';
import { socket } from '@/utils/socket';
import { Notification } from '@arco-design/web-vue';

import dayjs from 'dayjs';
import { ref } from 'vue'; // 运行结果弹窗
const isSocketing = ref(false); // 是否正在连接socket
const runCodeVisible = ref(false);

const resultArr = ref<string[]>([]);
const handleRunProject = async () => {
	const res = await getRunDrwbncf();
	if (!res.data) {
		Notification.error({
			content: res.msg,
			duration: 3000
		});
	} else {
		runCodeVisible.value = true;
		const scrollElement = document.querySelector('#modalScrollbar')!;
		isSocketing.value = true;
		resultArr.value = [];
		socket.connect();
		const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
		resultArr.value.push(`${startTime}: 项目开始运行!`);
		socket.on('runCode', (e: string) => {
			// console.log('🚀 ~ socket.on ~ e:', e);
			if (e !== 'tutu~end') {
				if (e.includes('[A') || ['', ' ', '\n', '\r\n'].includes(e)) {
					console.log('无效传递');
				} else if (e.includes('Epoch ')) {
					resultArr.value.pop();
					// if (!last.includes('Epoch ')) resultArr.value.push(last);
					resultArr.value.push(e);
				} else {
					resultArr.value.push(e);
				}
				// scrollElement.scrollTop += 22;
				scrollElement.scrollTop = scrollElement.scrollHeight;
			} else {
				const endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
				resultArr.value.push(`${endTime}: 项目运行结束!`);
				resultArr.value.push(`总耗时:${dayjs(endTime).diff(startTime, 'second')}s,项目运行结束!`);
				socket.disconnect();
				isSocketing.value = false;
				scrollElement.scrollTop = scrollElement.scrollHeight;
				// scrollElement.scrollTop = scrollElement.scrollHeight + 100;

				Notification.success({
					content: '项目运行成功',
					duration: 3000
				});
			}
		});
	}
};
</script>

<style lang="less" scoped>
.result-pre {
	margin: 0;
}
</style>
