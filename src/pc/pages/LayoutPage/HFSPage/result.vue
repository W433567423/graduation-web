<!--
* DONE
* @description:  组件
* @author: tutu
* @time: 2024-04-13 18:47:01
-->
<template>
	<a-scrollbar style="height: 100%; overflow: auto" outer-class="h100%">
		<div class="cancer-result-wrap">
			<section class="bg-#f2f3f5 px-12% py-32px">
				<div class="cancer-section-title">诊断结果</div>
				<a-card class="p20px mb-20px">
					<template #cover>
						<a-scrollbar style="width: 100%; overflow-x: auto" outer-class="w100%">
							<div id="chat0" class="aspect-ratio-2 mx-auto min-w-540px w80%"></div>
						</a-scrollbar>
					</template>
					<a-card-meta
						description="表明随着n继续增加，准确率增加；当n =21、n =12、n =16时，准确率达到峰值，然后呈现下降趋势，这意味着添加的特征包含的噪声多于信息。在本研究中，我们将首先达到最高点时的特征子集作为最优。即分别n = 21、n = 12、n = 16作为BRCA、LUAD和KIRC最终选择的特征数量。"></a-card-meta>
				</a-card>
				<a-card class="p20px mb-20px">
					<template #cover>
						<h3 class="text-center">不同数据集的比较结果</h3>
						<a-scrollbar style="width: 100%; overflow-x: auto" outer-class="w100%">
							<div class="flex! flex-wrap flex-content-between min-w-1000px">
								<div id="chat1" class="aspect-ratio-1 max-w-500px w100% mx-auto" />
								<div id="chat2" class="aspect-ratio-1 max-w-500px w100% mx-auto" />
								<div id="chat3" class="aspect-ratio-1 max-w-500px w100% mx-auto" />
								<div id="chat4" class="aspect-ratio-1 max-w-500px w100% mx-auto" />
							</div>
						</a-scrollbar>
						<h3 class="text-center">比较结果的热图</h3>
						<a-scrollbar style="width: 100%; overflow-x: auto" outer-class="w100%">
							<div id="chat5" class="aspect-ratio-1.5 mx-auto min-w-960px mx-auto"></div>
						</a-scrollbar>
					</template>
					<a-card-meta>
						<template #description>
							<div class="indent-2xl">
								如图所示，消融分析的 HFS-SLPEE
								性能,我们提出的方法主要由三部分组成，即三重数据集（TDS）、新颖的分层特征选择算法和SLPEE模型。为了检查每个组件的贡献，我们将所提出的方法与几种组合进行了比较。
							</div>
							<div class="indent-2xl">
								首先，我们将三重数据集与其他七个数据集（包括mRNA、miRNA、lncRNA、ncRNA、DNA甲基化、转录组以及mRNA和DNA甲基化）进行比较，以检查三重数据集的贡献。我们发现，与其他七个数据集相比，三元组数据集取得了最佳性能（见图4A、B）。具体来说，miRNA、mRNA、ncRNA、DNA甲基化都是单一类型的数据集，没有绝对的优势，它们在不同癌症中的贡献率和诊断表现也不同。与所包含的单一类型数据集相比，双链型数据集（转录组、mRNA
								和
								DNA甲基化）在许多情况下具有改进的性能。结果表明，三元组数据集包含了更全面、更有用的信息，提供了强有力的数据支持。
							</div>
						</template>
					</a-card-meta>
				</a-card>
				<a-card class="p20px">
					<template #cover>
						<div>
							<img :style="{ width: '100%' }" alt="dessert" src="@/assets/images/hfsResult.png" />
						</div>
					</template>
					<a-card-meta
						title="HFS-SLPEE对三种癌症的诊断结果(%)"
						description="我们利用21个关键特征使BRCA达到99.65%的准确性、99.61%的敏感性、100%的特异性和99.81%的F1分数，并且只有3个样本被误诊。对于LUAD和KIRC，我们选择了12个和16个关键特征来实现四指标100%精准诊断。结果表明，HFS-SLPEE 取得了优异的性能，并且对于三种高发癌症的诊断具有泛化能力。"></a-card-meta>
				</a-card>
			</section>
		</div>
	</a-scrollbar>
</template>

<script lang="ts" setup>
import echarts from '@/config/chart.config';
import { onMounted } from 'vue';
import {
	chatAccuracyOption,
	chatDifferentOption1,
	chatDifferentOption2,
	chatDifferentOption3,
	chatDifferentOption4,
	chatHeatmapOption
} from './mock';

onMounted(() => {
	const myChart0 = echarts.init(document.getElementById('chat0'), null, { width: 'auto', height: 'auto' });
	myChart0.setOption(chatAccuracyOption);
	const myChart1 = echarts.init(document.getElementById('chat1'), null, { width: 'auto', height: 'auto' });
	myChart1.setOption(chatDifferentOption1);
	const myChart2 = echarts.init(document.getElementById('chat2'), null, { width: 'auto', height: 'auto' });
	myChart2.setOption(chatDifferentOption2);
	const myChart3 = echarts.init(document.getElementById('chat3'), null, { width: 'auto', height: 'auto' });
	myChart3.setOption(chatDifferentOption3);
	const myChart4 = echarts.init(document.getElementById('chat4'), null, { width: 'auto', height: 'auto' });
	myChart4.setOption(chatDifferentOption4);
	const myChart5 = echarts.init(document.getElementById('chat5'), null, { width: 'auto', height: 'auto' });
	myChart5.setOption(chatHeatmapOption);
	window.addEventListener('resize', function () {
		myChart0.resize();
		myChart1.resize();
		myChart2.resize();
		myChart3.resize();
		myChart4.resize();
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
