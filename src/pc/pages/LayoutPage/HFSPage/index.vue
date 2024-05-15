<!--
* DONE
* @description:  组件
* @author: tutu
* @time: 2024-04-13 16:57:51
-->
<template>
	<a-scrollbar style="height: 100%; overflow: auto" outer-class="h100%">
		<div class="cancer-wrap">
			<section class="bg-#fff px-12% py-32px">
				<div class="cancer-section-title">基于web的乳腺癌分类系统</div>
				<a-form :model="form" class="mt-24px" layout="vertical">
					<a-form-item label="请选择癌症类型">
						<a-select v-model="form.cancerType" placeholder="请选择癌症类型">
							<a-option value="乳腺癌">乳腺癌</a-option>
							<a-option value="肺癌">肺癌</a-option>
						</a-select>
					</a-form-item>
					<a-form-item label="请上传数据集">
						<a-upload
							@change="handleUploadDataSet"
							draggable
							action="#"
							v-model="form.fileList"
							class="mt-24px">
							<!-- <template #upload-button>请上传数据集</template> -->
						</a-upload>
					</a-form-item>
					<a-space size="large">
						<a-button @click="handleClear">清除</a-button>
						<a-button type="primary" @click="handleDetect">开始检测</a-button>
					</a-space>
				</a-form>
			</section>

			<section class="bg-#f2f3f5 px-12% py-32px">
				<div class="cancer-section-title">Help</div>
				<p class="indent-2xl">
					本系统使用的集成分类算法基于HFS-SLPEE模型，该模型在TCGA数据库中的乳腺癌数据集上进行了验证。实验结果表明，HFS-SLPEE模型在乳腺癌诊断中具有更高的准确性和稳定性，相比于单一分类器，HFS-SLPEE模型的准确性提高了5.2％，AUC值提高了0.04。此外，HFS-SLPEE模型还提供了更好的可解释性和可视化性能。
				</p>
			</section>

			<section class="bg-#fff px-12% py-32px">
				<div class="cancer-section-title">Datasets</div>
				<div class="text-center">
					Source data and code can be downloaded from
					<a-link href="https://github.com/luckymengmeng/HFS-SLPEE">
						https://github.com/luckymengmeng/HFS-SLPEE
					</a-link>
					.
				</div>
			</section>
		</div>
	</a-scrollbar>
	<div class="cancer-spin-wrap" v-if="loading">
		<a-progress
			:percent="percent"
			class="my-32px"
			:style="{ width: '50%' }"
			size="large"
			:color="{
				'0%': 'rgb(var(--primary-6))',
				'100%': 'rgb(var(--success-6))'
			}" />
		<a-spin dot tip="正在检测中..." class="text-20px" :size="24" />
	</div>
</template>

<script lang="ts" setup>
import { Scrollbar as AScrollbar, type FileItem } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({ cancerType: '', fileList: [] });
const loading = ref(false);
const percent = ref(0);

// 清除
const handleClear = () => {
	form.value.cancerType = '';
};

// 开始检测
const handleDetect = () => {
	console.log('🚀 ~ form:', form.value);
	loading.value = true;
	const interval = setInterval(() => {
		const rand = Math.random() * 0.08;
		percent.value = Number((percent.value + rand).toFixed(2));
		if (percent.value >= 1) {
			percent.value = 1;
			clearInterval(interval);
			setTimeout(() => {
				loading.value = false;
				router.push('/pc/result');
			}, 300);
		}
	}, 200);
};

// 上传数据集
const handleUploadDataSet = (_fileList: FileItem[], fileItem: FileItem) => {
	console.log('🚀 ~ file:', fileItem);
};
</script>

<style lang="less" scoped>
.cancer-wrap {
	width: 100%;
	height: 100%;
	// background-color: #d6fcff;
	font-size: 20px;

	// 屏幕宽度小于500px时，字体大小调整为20px
	@media (max-width: 500px) {
		font-size: 16px;
	}

	:deep(.arco-scrollbar) {
		height: 100%;
	}

	.cancer-section-title {
		font-size: 42px;
		padding-top: 32px;
		padding-bottom: 20px;
		margin: 0 auto;
		font-weight: 600;
		text-align: center;

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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 32px;

	:deep(.arco-spin-tip) {
		margin-top: 40px;
		font-size: 20px;
		color: red;
	}

	:deep(.arco-progress-line-text) {
		color: red;
	}
}
</style>
