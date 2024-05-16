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
				<h3 class="text-center">不同数据集的各项衡量指标比较结果</h3>
				<a-card class="p20px mb-20px">
					<template #cover>
						<a-scrollbar style="width: 100%; overflow-x: auto" outer-class="w100%">
							<div class="flex! flex-wrap flex-content-between min-w-840px">
								<div id="chat1" class="aspect-ratio-1 max-w-420px w100% mx-auto" />
								<div id="chat2" class="aspect-ratio-1 max-w-420px w100% mx-auto" />
								<div id="chat3" class="aspect-ratio-1 max-w-420px w100% mx-auto" />
								<div id="chat4" class="aspect-ratio-1 max-w-420px w100% mx-auto" />
							</div>
						</a-scrollbar>
					</template>
					<a-card-meta>
						<template #description>
							<div class="indent-2xl text-20px">
								如图所示，本系统使用的数据集提出的方法主要由三部分组成，即三重数据集（TDS）、新颖的分层特征选择算法和集成模型。为了检查每个组件的贡献，我们将所提出的方法与几种组合进行了比较。
							</div>
							<div class="indent-2xl text-20px">
								首先，我们将三重数据集与其他七个数据集（包括mRNA、miRNA、lncRNA、ncRNA、DNA甲基化、转录组以及mRNA和DNA甲基化）进行比较，以检查三重数据集的贡献。我们发现，与其他七个数据集相比，三元组数据集取得了最佳性能（见图4A、B）。具体来说，miRNA、mRNA、ncRNA、DNA甲基化都是单一类型的数据集，没有绝对的优势，它们在不同癌症中的贡献率和诊断表现也不同。与所包含的单一类型数据集相比，双链型数据集（转录组、mRNA和DNA甲基化）在许多情况下具有改进的性能。结果表明，三元组数据集包含了更全面、更有用的信息，提供了强有力的数据支持。
							</div>
						</template>
					</a-card-meta>
				</a-card>
			</section>
		</div>
	</a-scrollbar>
</template>

<script lang="ts" setup>
import echarts from '@/config/chart.config';
import { onMounted } from 'vue';
import {
	chatDifferentOption1,
	chatDifferentOption2,
	chatDifferentOption3,
	chatDifferentOption4
} from './mock';

onMounted(() => {
	const myChart1 = echarts.init(document.getElementById('chat1'), null, { width: 'auto', height: 'auto' });
	myChart1.setOption(chatDifferentOption1);
	const myChart2 = echarts.init(document.getElementById('chat2'), null, { width: 'auto', height: 'auto' });
	myChart2.setOption(chatDifferentOption2);
	const myChart3 = echarts.init(document.getElementById('chat3'), null, { width: 'auto', height: 'auto' });
	myChart3.setOption(chatDifferentOption3);
	const myChart4 = echarts.init(document.getElementById('chat4'), null, { width: 'auto', height: 'auto' });
	myChart4.setOption(chatDifferentOption4);
	window.addEventListener('resize', function () {
		myChart1.resize();
		myChart2.resize();
		myChart3.resize();
		myChart4.resize();
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
