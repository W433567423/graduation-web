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
				<h3 class="text-center">本系统对乳腺癌的诊断结果(%)</h3>
				<a-card class="p20px">
					<template #cover>
						<div>
							<a-table :columns="columns" :data="data" :pagination="false" />
						</div>
					</template>
					<!-- title="HFS-SLPEE对三种癌症的诊断结果(%)" -->
					<a-card-meta
						class="text-20px"
						description="我们利用21个关键特征使对乳腺癌的分类诊断达到99.65%的准确性、99.61%的敏感性、100%的特异性和99.81%的F1分数，并且只有3个样本被误诊。结果表明，本系统采用的集成分类算法取得了优异的性能，并且对于乳腺癌的诊断具有泛化能力。"></a-card-meta>
				</a-card>
			</section>
		</div>
	</a-scrollbar>
</template>

<script lang="ts" setup>
import type { TableColumnData, TableData } from '@arco-design/web-vue';
import { ref } from 'vue';
const columns: TableColumnData[] = [
	{
		title: '指标',
		dataIndex: 'metrics',
		// ellipsis: true,
		// tooltip: true,
		align: 'center'
	},
	{
		title: '乳腺癌',
		dataIndex: 'BRCA',
		align: 'center'
	},
	{
		title: '其他癌症',
		dataIndex: 'other',
		align: 'center'
	}
];
const data = ref<TableData[]>([
	{
		key: '1',
		metrics: '关键特征数量',
		BRCA: 21,
		other: '/'
	},
	{
		key: '2',
		metrics: '真阳性(TP)',
		BRCA: 775,
		other: '/'
	},
	{
		key: '3',
		metrics: '真阴性(TN)',
		BRCA: 83,
		other: '/'
	},
	{
		key: '4',
		metrics: '假阴性(FN)',
		BRCA: 3,
		other: '/'
	},
	{
		key: '5',
		metrics: '准确率',
		BRCA: '99.65%',
		other: '/'
	},
	{
		key: '6',
		metrics: '灵敏度',
		BRCA: '99.61%',
		other: '/'
	},
	{
		key: '7',
		metrics: '特异性',
		BRCA: '100%',
		other: '/'
	},
	{
		key: '8',
		metrics: 'F1分数',
		BRCA: '99.81%',
		other: '/'
	}
]);
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
