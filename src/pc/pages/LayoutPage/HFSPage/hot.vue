<!--
* DONE
* @description:  组件
* @author: tutu
* @time: 2024-04-13 18:47:01
-->
<template>
	<a-scrollbar style="height: 100%; overflow: auto" outer-class="h100%">
		<div class="cancer-result-wrap">
			<section class="bg-#f2f3f5 px-12% py-32px h100%">
				<h3 class="text-center">不同数据集各项衡量指标的比较结果热图</h3>

				<a-card class="p20px mb-20px">
					<template #cover>
						<a-scrollbar style="width: 100%; overflow-x: auto" outer-class="w100%">
							<div id="chat5" class="aspect-ratio-1.5 mx-auto min-w-480px max-w-900px mx-auto"></div>
						</a-scrollbar>
					</template>
					<a-card-meta>
						<template #description></template>
					</a-card-meta>
				</a-card>
			</section>
		</div>
	</a-scrollbar>
</template>

<script lang="ts" setup>
import echarts from '@/config/chart.config';
import { onMounted } from 'vue';
import { chatHeatmapOption } from './mock';

onMounted(() => {
	const myChart5 = echarts.init(document.getElementById('chat5'), null, { width: 'auto', height: 'auto' });
	myChart5.setOption(chatHeatmapOption);
	window.addEventListener('resize', function () {
		myChart5.resize();
	});
});
</script>

<style lang="less" scoped>
.cancer-result-wrap {
	width: 100%;
	height: 100%;
	background-color: #d6fcff;
	font-size: 20px;

	:deep(.arco-scrollbar) {
		height: 100%;
	}

	.cancer-section-title {
		font-size: 42px;
		padding-top: 32px;
		padding-bottom: 20px;
		margin: 0 auto;
		text-align: center;
		font-weight: 600;
		// 屏幕宽度小于500px时，字体大小调整为20px
		@media (max-width: 500px) {
			font-size: 20px;
		}
	}
}

.cancer-spin-wrap {
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;

	:deep(.arco-spin-tip) {
		margin-top: 40px;
		font-size: 20px;
		color: red;
	}
}
</style>
