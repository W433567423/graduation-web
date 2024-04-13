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
						<div>
							<img
								:style="{ width: '100%', transform: 'translateY(-20px)' }"
								alt="dessert"
								src="@/assets/images/hfsAccuracy.png" />
						</div>
					</template>
					<a-card-meta
						title="三种癌症的特征与准确率的关系曲线"
						description="表明随着n继续增加，准确率增加；当n =21、n =12、n =16时，准确率达到峰值，然后呈现下降趋势，这意味着添加的特征包含的噪声多于信息。在本研究中，我们将首先达到最高点时的特征子集作为最优。即分别n = 21、n = 12、n = 16作为BRCA、LUAD和KIRC最终选择的特征数量。"></a-card-meta>
				</a-card>
				<a-card class="p20px">
					<template #cover>
						<div>
							<img
								:style="{ width: '100%', transform: 'translateY(-20px)' }"
								alt="dessert"
								src="@/assets/images/hfsResult.png" />
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

<script lang="ts" setup></script>

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
