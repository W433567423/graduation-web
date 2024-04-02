<!--
* DONE
* @description: DRWBNCF 组件
* @author: tutu
* @time: 2024-03-29 12:12:39
-->
<template>
	<main class="main-contain-wrap">
		<h2 class="text-center">
			A weighted bilinear neural collaborative filtering approach for drug repositioning
		</h2>
		<a-scrollbar class="overflow-auto w100% h100%" outer-class="h100% drwbncf-outer-scroll">
			<div class="flex flex-col flex-items-center gap-32px">
				<h3>概要</h3>
				<div class="text-16px indent-lg">
					药物再定位是传统药物发现和发展的高效且有前景的策略。许多研究工作集中于利用基于异质网络的深度学习方法来建模复杂的药物-疾病关联。类似于传统的潜在因子模型，直接因子化药物-疾病关联，它们假定网络中的邻居相互独立，因此往往无法捕捉到局部信息。在这项研究中，我们提出了一种基于邻域和邻域交互的神经协作过滤方法（称为DRWBNCF），以推断治疗疾病的新型潜在药物。具体来说，我们首先构建三个网络，包括已知的药物-疾病关联网络、药物相似性网络和疾病相似性网络（使用最近邻）。为了利用这三个网络中的局部信息优势，我们设计了一个整合组件，通过提出一种新的加权双线性图卷积操作，将已知的药物-疾病关联、药物和疾病的邻居以及邻域之间的互动信息集成为统一表征。最后，我们引入了一个预测组件，利用多层感知器和α平衡焦点损失函数以及图正则化来建模复杂的药物-疾病关联。对三个数据集的基准比较验证了DRWBNCF在药物再定位中的有效性。重要的是，DRWBNCF预测的未知药物-疾病关联已被临床试验和三个权威数据库验证，我们列出了DRWBNCF预测的几种新的乳腺癌（例如波莫司汀和替硼甙）和小细胞肺癌（例如波莫司汀和西他格宁）的潜在药物。
				</div>
				<h3>计算方法</h3>
				<div class="flex flex-col flex-items-center gap-20px">
					<div>
						BNNR是一种新颖的计算方法，它利用有界核范数正则化算法来识别已知或新药物的潜在新适应症。该包中的代码实现了用于药物重新定位的有界核范数正则化（BNNR），该规则在
						Matlab2014a 中实现。
					</div>
					<div>
						在这项工作中，我们提出了一种使用贝叶斯归纳矩阵完成（DRIMC）的新型药物重新定位方法。首先，我们将四个药物数据源嵌入到药物相似性矩阵中，将两个疾病数据源嵌入到疾病相似性矩阵中。然后，对于每种药物或疾病，其特征通过其与其最近邻居之间的相似性值来描述，并且药物和疾病的这些特征被映射到共享的潜在空间上。我们通过归纳矩阵完成对每个药物-疾病对的关联概率进行建模，其中药物和疾病的属性分别由药物和疾病的投影表示。由于已知的药物与疾病的关联已经过人工验证，因此它们比未知的药物与疾病关联更值得信赖和重要。与未知关联对相比，我们为已知关联对分配了更高的置信度。我们在三个基准数据集上进行了全面的实验，与六种最先进的方法相比，DRIMC提高了预测准确性。
					</div>
				</div>
				<h3>数据集</h3>
				<div>
					在本研究中，我们采用了之前作品中使用的三个真实数据集来评估 DRWBNCF 的有效性。第一个是 Fdataset [
					18 , 27 ]，它对应于 Gottlieb等人的工作中报告的金标准药物-疾病数据集。 [ 28 ]。它包括 DrugBank
					数据库 [ 29 ] 中收集的 593 种药物和 OMIM 数据库 [ 30 ] 中获得的 313 种疾病之间的 1933
					种已知药物与疾病之间的关联。第二个是 Cdataset [ 31 ]，包含从 DrugBank 数据库中提取的 663 种药物与
					OMIM 数据库中列出的 409 种疾病之间的 2532
					种已知药物-疾病关联。第三个是LRSSL，包括从DrugBank数据库中获取的763种药物，从MeSH数据库中获取的681种疾病以及总共3051个经过验证的药物-疾病关联[
					32 ]。三个数据集的简单统计如表1所示。
				</div>
			</div>
		</a-scrollbar>
		<footer class="flex justify-center gap-32px flex-items-center h-72px">
			<a-button @click="handleRunProject" type="primary">开始诊断</a-button>
			<a-button @click="handleCatLast">查看上一次的诊断结果</a-button>
		</footer>
	</main>
	<!-- excel展示 -->
	<a-modal
		:visible="excelVisible"
		modalClass="w80vw! h80vh!"
		:body-style="{ height: 'calc(100% - 160px)' }"
		ok-text="关闭"
		title="诊断结果"
		@cancel="excelVisible = false"
		@ok="excelVisible = false"
		:hide-cancel="true">
		<a-scrollbar class="overflow-auto overflow-y-scroll w100% h100%" outer-class="h100%  w100%">
			<a-table :data="tableData" :columns="columns" :pagination="false"></a-table>
		</a-scrollbar>
	</a-modal>

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
			class="overflow-auto overflow-y-scroll w100% h100%"
			outer-class="h100%  w100%"
			id="modalScrollbar">
			<div id="totalHeight">
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
				<a-table :data="tableData" :columns="columns" v-if="!isSocketing"></a-table>
			</div>
		</a-scrollbar>
	</a-modal>
</template>

<script lang="ts" setup>
import { getExcelDrwbncf, getRunDrwbncf } from '@/services/drwbncf.api';
import { socket } from '@/utils/socket';
import { Notification, type TableColumnData, type TableData } from '@arco-design/web-vue';

import dayjs from 'dayjs';
import { ref } from 'vue';
const isSocketing = ref(false); // 是否正在连接socket

const tableData = ref<TableData[]>([]);
const columns = ref<TableColumnData[]>([]);
const excelVisible = ref(false);
const runCodeVisible = ref(false);

const resultArr = ref<string[]>([]);

/**
 * DONE
 * @description 刷新诊断结果
 * @author tutu
 * @time 2024-03-31 20:48:43
 */
const handleRefreshExcel = async () => {
	const data = await getExcelDrwbncf();
	if (data) {
		columns.value = data[0].map((e: string) => {
			return {
				title: e,
				dataIndex: e,
				width: e === 'split_id' ? 100 : 0
			};
		});

		tableData.value = data.slice(1).map((e: string[]) => {
			const obj: TableData = {};
			e.forEach((item, index) => {
				obj[data[0][index]] = item;
			});
			return obj;
		});
		return true;
	} else {
		Notification.error({
			content: '请先开始诊断，再查看诊断结果',
			duration: 3000
		});
		return false;
	}
};

/**
 * DONE
 * @description 查看上一次的诊断结果
 * @author tutu
 * @time 2024-03-31 19:55:19
 */
const handleCatLast = async () => {
	const res = await handleRefreshExcel();
	if (res) excelVisible.value = true;
	// tableColumnData.value = res.data;
};

/**
 * DONE
 * @description 运行项目代码，开始诊断项目
 * @author tutu
 * @time 2024-03-31 19:55:52
 */
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
		resultArr.value.push(`${startTime}: 开始诊断!`);
		socket.on('runCode', async (e: string) => {
			// console.log('🚀 ~ socket.on ~ e:', e);
			if (e !== 'tutu~end') {
				const last = resultArr.value[resultArr.value.length - 1];

				if (e.includes('[A') || ['', ' ', '\n', '\r\n'].includes(e) || e.match(/^\s*$/)) {
					console.log('无效传递');
				} else if (e.includes('Epoch ') && last.split(':')[0] === e.split(':')[0]) {
					resultArr.value.pop();
					resultArr.value.push(e);
				} else {
					resultArr.value.push(e);
				}
				scrollElement.scrollTop = scrollElement.scrollHeight;
			} else {
				const endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
				resultArr.value.push(`${endTime}: 诊断结束!`);
				socket.disconnect();
				await handleRefreshExcel();

				isSocketing.value = false;
				scrollElement.scrollTop = scrollElement.scrollHeight;

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
.main-contain-wrap {
	height: -webkit-calc(100vh - 82px);
	height: -moz-calc(100vh - 82px);
	height: calc(100vh - 82px);
	padding: 0 64px;
	.result-pre {
		margin: 0;
	}
	.drwbncf-outer-scroll {
		height: calc(100% - 150px);
	}
}
</style>
