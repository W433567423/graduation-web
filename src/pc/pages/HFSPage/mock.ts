import { type ECOption } from '@/config/chart.config';

// 准确率与特征数量的关系
export const chatAccuracyOption: ECOption = {
	title: [
		{
			text: '三种癌症的特征与准确率的关系曲线',
			left: 'center'
		}
	],
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line'
		}
	},
	xAxis: {
		type: 'value',
		name: '特征编号',
		nameLocation: 'middle',
		min: 5,
		max: 30,
		splitLine: { show: false }
	},
	yAxis: {
		name: '准确率',
		type: 'value',
		min: 0.984,
		max: 1,
		interval: 0.002,
		splitLine: { show: false }
	},
	series: [
		{
			name: 'BRCA的准确度',
			type: 'line',
			endLabel: {
				show: true,
				formatter: (e) => e.seriesName?.slice(0, 4) || '',
				distance: 20
			},
			emphasis: {
				focus: 'series'
			},
			data: [
				[5, 0.985],
				[6, 0.991],
				[7, 0.99],
				[8, 0.992],
				[10, 0.993],
				[11, 0.992],
				[12, 0.9895],
				[13, 0.992],
				[14, 0.9915],
				[15, 0.9915],
				[16, 0.992],
				[17, 0.992],
				[18, 0.9915],
				[19, 0.984],
				[20, 0.994],
				[21, 0.9965],
				[23, 0.992],
				[24, 0.9925],
				[25, 0.987],
				[26, 0.992],
				[27, 0.9925],
				[28, 0.992],
				[29, 0.9925],
				[30, 0.9895]
			]
		},
		{
			name: 'LUAD的准确度',
			type: 'line',
			endLabel: {
				show: true,
				formatter: (e) => e.seriesName?.slice(0, 4) || '',
				distance: 20
			},
			emphasis: {
				focus: 'series'
			},
			data: [
				[5, 0.996],
				[6, 0.996],
				[7, 0.994],
				[8, 0.998],
				[9, 0.998],
				[10, 0.996],
				[11, 0.996],
				[12, 1],
				[13, 0.998],
				[14, 0.998],
				[15, 0.996],
				[16, 0.998],
				[17, 0.996],
				[18, 0.996],
				[19, 0.988],
				[20, 0.996],
				[21, 0.996],
				[22, 0.998],
				[24, 0.994],
				[25, 0.994],
				[26, 0.996],
				[27, 0.992],
				[28, 0.994],
				[29, 0.99],
				[30, 0.994]
			]
		},
		{
			name: 'KIRC的准确度',
			type: 'line',
			endLabel: {
				show: true,
				formatter: (e) => e.seriesName?.slice(0, 4) || '',
				distance: 20
			},
			emphasis: {
				focus: 'series'
			},
			data: [
				[5, 0.994],
				[6, 0.997],
				[15, 0.997],
				[16, 1],
				[17, 0.994],
				[18, 0.994],
				[19, 1],
				[20, 1],
				[22, 0.994],
				[23, 0.994],
				[24, 0.997],
				[25, 0.997],
				[26, 0.994],
				[27, 0.997],
				[28, 0.994],
				[29, 0.997],
				[30, 0.997]
			]
		}
	]
};

// 不同数据集的比较结果
export const chatDifferentOption: ECOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		data: ['mRNA', 'IncRNA', 'DM', 'mRNA+DM', 'miRNA', 'ncRNA', 'Transcriptomic', 'TDS']
	},
	xAxis: [
		{
			type: 'category',
			axisTick: { show: false },
			data: ['BRCA_21', 'LUAD_12', 'KIRC_16']
		}
	],
	yAxis: [
		{
			name: 'Accuracy(%)',
			nameTextStyle: { padding: [0, 0, 20, 0] },
			nameLocation: 'middle',
			type: 'value',
			min: 96,
			max: 100,
			interval: 0.5,
			splitLine: { show: true }
		}
	],
	series: [
		{
			name: 'mRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.2, 98.2, 99.4]
		},
		{
			name: 'IncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [98.7, 98.4, 98]
		},
		{
			name: 'DM',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [98.4, 99.6, 99.6]
		},
		{
			name: 'mRNA+DM',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.3, 99.3, 99.3]
		},
		{
			name: 'miRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [97.2, 96.6, 98]
		},
		{
			name: 'ncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [98.6, 99.5, 99.0]
		},
		{
			name: 'Transcriptomic',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [98.6, 99.2, 99.2]
		},
		{
			name: 'TDS',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.7, 100, 100]
		}
	]
};
