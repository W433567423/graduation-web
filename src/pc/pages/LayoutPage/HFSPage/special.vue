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
				<h3 class="text-center">特征数量n与准确率的关系曲线</h3>
				<a-card class="p20px mb-20px">
					<template #cover>
						<a-scrollbar style="width: 100%; overflow-x: auto" outer-class="w100%">
							<div id="chat0" class="aspect-ratio-2 mx-auto min-w-540px w80% h500px"></div>
						</a-scrollbar>
					</template>
					<a-card-meta
						class="text-20px"
						description="表明随着特征数量n继续增加，准确率增加；当n =21时，对乳腺癌诊断的准确率达到峰值，然后呈现下降趋势，这意味着添加的特征包含的噪声多于信息。在本研究中，我们将首先达到最高点时的特征子集作为最优。即n = 21作为乳腺癌的最终选择的特征数量。"></a-card-meta>
				</a-card>
			</section>
		</div>
	</a-scrollbar>
</template>

<script lang="ts" setup>
import echarts from '@/config/chart.config';
import { onMounted } from 'vue';
import { chatAccuracyOption } from './mock';

onMounted(() => {
	const myChart0 = echarts.init(document.getElementById('chat0'), null, { width: 'auto', height: 'auto' });
	myChart0.setOption(chatAccuracyOption);

	window.addEventListener('resize', function () {
		myChart0.resize();
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
