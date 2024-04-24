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
					高通量RNA-seq数据的出现为癌症诊断提供了前所未有的机会。然而，通过大多数现有的癌症诊断方法捕获具有高度非线性和复杂关联的生物数据一直具有挑战性。在这项研究中，我们提出了一种新颖的分层特征选择和二次学习概率误差集成模型（名为
					HFS-SLPEE），用于精准癌症诊断。
				</p>
				<p class="indent-2xl">
					具体来说，我们首先整合蛋白质编码基因表达谱、非编码RNA表达谱和DNA甲基化数据，提供丰富的信息；随后，我们设计了一种新颖的分层特征选择方法，该方法考虑了CpG基因的生物学关联，并且可以选择一组紧凑的高级特征；接下来，我们使用四个具有显着差异和明显互补性的单独分类器来构建异构分类器；最后，我们开发了第二种学习概率误差集成模型SLPEE，以彻底学习由分类器预测的类概率值和实际标签组成的新数据，进一步实现诊断错误的自我纠正。
				</p>
				<p class="indent-2xl">
					TCGA 的基准比较表明，HFS-SLPEE 的性能优于最先进的方法。此外，我们深入分析了 10
					组选定的特征，发现了几种新的 HFS-SLPEE 预测的表观基因组学和表观遗传学生物标志物，用于乳腺浸润性癌
					(BRCA)（例如 TSLP 和 ADAMTS9-AS2）、肺腺癌 (LUAD)（例如， HBA1 和 CTB-43E15.1)，以及肾肾透明细胞癌
					(KIRC)（例如 IRX2 和 BMPR1B-AS1）。
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

			<section class="bg-#f2f3f5 px-12% py-32px text-16px text-coolGray">
				<div class="cancer-section-title">Citation</div>
				<div>
					<p class="indent-2xl">
						癌症具有发病隐匿、治愈率低、死亡率高的特点。传统的手术、放疗、化疗对晚期癌症患者效果有限。癌症诊断是目前的研究热点。通过获取各种组织样本中的大量基因表达谱，可以在分子水平上进行癌症诊断。早期生物学认为癌症与蛋白质编码基因的突变密切相关(
						Stratton et al., 2009
						)。因此，大量研究证实了基于信使RNA（mRNA）表达谱进行癌症诊断的可行性，并取得了一些良好的结果（Ben-Dor等，2000；Furey等，2000；Li等，2001）。近年来生物学研究发现，在不改变蛋白质编码基因组序列的情况下，癌症中存在大量涉及非编码RNA（ncRNA）和DNA甲基化等多方面的表观遗传变异（Baylin和Ohm，2006；Luo等）等人，2016；肖等人，2018a）。许多研究利用了表观遗传数据，例如
						microRNA (miRNA) ( Saha et al., 2015 )、长非编码 RNA (lncRNA) 表达谱 ( Zhang et al., 2018 ) 和
						DNA 甲基化 ( Al-Juniad et al., 2018 )。
						2018）用于癌症诊断和亚型分类，取得了一些成果（Raweh等，2018；Tang等，2018）。然而，最新的生物学研究表明，多生物标志物可以提高癌症诊断的准确性和稳健性(
						Modelska et al., 2015 )。赵等人。 (2018)整合蛋白编码基因、miRNA 和 lncRNA 表达谱用于肺腺癌
						(LUAD) 诊断。Alghunaim 和 Al-Baity (2019)将蛋白质编码基因表达谱和 DNA 甲基化融合用于乳腺浸润性癌
						(BRCA)
						诊断。经典遗传学和表观遗传学是参与致癌作用的两种独立机制（Network，2012）。此外，ncRNA和DNA甲基化等表观遗传学数据并不是相互独立的，它们往往具有协同效应(
						Xu et al., 2018
						)。因此，仅使用蛋白质编码基因表达谱和/或ncRNA表达谱或DNA甲基化数据会导致信息的缺乏，并阻碍癌症诊断的高性能和鲁棒性的显着提高。
					</p>
					<p class="indent-2xl">
						大规模RNA-seq数据和DNA甲基化数据的出现为开发癌症诊断方法提供了前所未有的机会。然而，整合转录组分析（即蛋白质编码基因和
						ncRNA 表达谱）和 DNA 甲基化数据进行癌症诊断面临着挑战。模型等人。 (2001) ;安格等人。
						（2015），高等人。 (2017) ;卢等人。 （2017），以及孙等人。
						(2019)指出转录组分析和DNA甲基化数据具有高维度、高冗余和复杂的相互作用关联的特点。为了解决高维问题，通常采用特征评分函数（例如正常样本和肿瘤样本之间的差异和距离、相关系数以及特征和类别之间的信息度量）来过滤特征（Lazar
						et al., 2012）。例如，Yoon 和 Lim (2013)使用t检验和欧氏距离，Cao 等人。
						（2015）采用折叠变化（FC）和错误发现率（FDR）作为过滤特征。这些过滤方法有效地去除不相关的特征来降低维度，具有通用性强、复杂度低的特点，适合处理高维数据。然而，这些过滤方法都是从单个特征的角度出发，没有考虑特征之间的高冗余。随后，彭等人。
						(2005)提出了最小冗余和最大相关性准则，称为mRMR，该准则基于特征和类别之间的最大相关性以及特征子集中的特征之间的最小冗余。吕等人。
						(2017)设计了LLRFCscore+算法，该算法首先根据LLRFC标准对特征进行降序排序，然后使用动态相关性分析策略进一步消除冗余特征。拉维等人。
						(2018)开发了一种具有过滤方法的混合特征选择算法和一种新的特征提取算法。这些方法基于信息学理论，可以有效地去除单一类型数据的冗余。然而，这些方法将DNA甲基化CpG位点和基因之间的多对多修饰关联计算为冗余相关性。因此，转录组分析和DNA甲基化数据的特征选择方法有必要进一步研究。
					</p>
					<p class="indent-2xl">
						诊断模型对于癌症诊断也至关重要。由于分类器的多样性，集成模型往往比单一模型具有更好的性能（Dietterich，2000a；Yang等，2010；Zhou和Jin，2017）。一般来说，癌症诊断领域常见的集成策略有三种，即投票法、平均法和学习法。例如，黄等人。
						(2017)提出了一种支持向量机(SVM)集成模型，该模型基于bagging和boosting采样构建了具有不同核函数的SVM基分类器，并使用多数投票和加权平均集成策略。
						SVM集成模型解决了单一模型易拟合、泛化能力有限的问题，但仅限于同类型分类器，不能完全保证分类器之间的差异性。Cho
						and Won
						(2003)训练了四种不同类型的个体分类器，并通过多数投票法获得了最终的集成模型。该方法利用了不同个体分类器之间的互补性，突破了单一分类器应用范围的限制。虽然通过投票和平均方法集成同质和异质分类器相对简单，但无法集成分类器之间的非线性关系。为了进一步改进投票和平均方法，Xiao
						等人。
						(2018b)利用堆叠学习集成策略，基于交叉验证来训练五个不同的分类器，并将分类器的训练结果作为深度学习算法的输入。学习集成策略有效地整合了异构分类器之间的非线性关系。然而深度学习算法高度依赖样本量，其性能需要通过大量增加数据样本来提升。因此，这些集成方法在精确癌症诊断方面表现出有限的性能。
					</p>
					<p class="indent-2xl">
						为了解决上述局限性，我们提出了一种新颖的分层特征选择和二次学习概率误差集成模型，称为
						HFS-SLPEE，用于精准癌症诊断。在数据集层面，我们整合了蛋白质编码基因表达谱、ncRNA表达谱和DNA甲基化数据，构建了提供多视图视角和多样化信息的三重数据集。在特征选择层面，由于三元组数据集的维度、丰度和关联关系存在显着差异，我们设计了一种新颖的分层特征选择算法。第一阶段，我们开发了CpG位点聚合特征选择算法，称为CSAFS，无损存储超高维DNA甲基化CpG位点与基因之间的生物关联，将近50万维的DNA甲基化数据快速缩减至近3万维甲基化基因数据。在第2阶段特征选择中，我们使用不同的阈值通过FC和FDR进一步选择显着差异的特征。在第3阶段特征选择中，我们采用mRMR算法来选择一组紧凑的优质特征。在模型诊断层面，我们开发了第二种学习概率误差集成模型，名为SLPEE。具体来说，我们选择了四个具有显着差异和明显互补效应的单独分类器来构建异构分类器，然后获得分类器预测的类别概率预测。为了彻底学习非线性数据，SLPEE将分类器预测的类概率预测与验证集中的实际类标签相结合，构建新的训练集，其中隐式包含每个分类器的概率误差。此外，我们利用极限梯度提升（Xgboost）作为集成学习器来二次学习新的训练集。通过对癌症基因组图谱（TCGA）中的三种癌症基于10倍交叉验证的训练，HFS-SLPEE实现了LUAD和肾透明细胞癌（KIRC）的100％多指标，并获得了99.65％的准确率，99.61
						BRCA 的 % 敏感性、100% 特异性和 99.81% F1 分数，优于之前发布的方法。结果表明，HFS-SLPEE
						是一种准确且稳健的癌症诊断方法。
					</p>
					<p class="indent-2xl">
						理论上，这项工作的三个贡献如下：（i）我们整合了蛋白质编码基因表达谱、ncRNA表达谱和DNA甲基化数据，以解决癌症诊断信息缺乏的问题；
						(ii)我们考虑到生物复杂的关联，并开发了一种新颖的分层特征选择方法，该方法集成了所提出的CSAFS、FC&FDR、mRMR，以有效地选择一组优越且紧凑的特征；
						(iii)我们设计了一个SLPEE模型，通过二次学习异质分类器的预测类别概率值与真实值之间的误差规则进行预测，通过异质分类器的非线性集成实现诊断误差的自校正。
					</p>
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
				router.replace('/mobile/hfs-index');
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
	background-color: #d6fcff;
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
