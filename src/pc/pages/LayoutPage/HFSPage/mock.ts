import { type ECOption } from '@/config/chart.config';

// 准确率与特征数量的关系
export const chatAccuracyOption: ECOption = {
	// title: [
	// 	{
	// 		text: '三种癌症的特征与准确率的关系曲线',
	// 		left: 'center'
	// 	}
	// ],
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line'
		}
	},
	xAxis: {
		type: 'value',
		name: '特征数量n',
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
			name: '乳腺癌的准确度',
			type: 'line',
			endLabel: {
				show: true,
				formatter: (e) => e.seriesName?.slice(0, 3) || '',
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
		}
		// {
		// 	name: 'LUAD的准确度',
		// 	type: 'line',
		// 	endLabel: {
		// 		show: true,
		// 		formatter: (e) => e.seriesName?.slice(0, 4) || '',
		// 		distance: 20
		// 	},
		// 	emphasis: {
		// 		focus: 'series'
		// 	},
		// 	data: [
		// 		[5, 0.996],
		// 		[6, 0.996],
		// 		[7, 0.994],
		// 		[8, 0.998],
		// 		[9, 0.998],
		// 		[10, 0.996],
		// 		[11, 0.996],
		// 		[12, 1],
		// 		[13, 0.998],
		// 		[14, 0.998],
		// 		[15, 0.996],
		// 		[16, 0.998],
		// 		[17, 0.996],
		// 		[18, 0.996],
		// 		[19, 0.988],
		// 		[20, 0.996],
		// 		[21, 0.996],
		// 		[22, 0.998],
		// 		[24, 0.994],
		// 		[25, 0.994],
		// 		[26, 0.996],
		// 		[27, 0.992],
		// 		[28, 0.994],
		// 		[29, 0.99],
		// 		[30, 0.994]
		// 	]
		// },
		// {
		// 	name: 'KIRC的准确度',
		// 	type: 'line',
		// 	endLabel: {
		// 		show: true,
		// 		formatter: (e) => e.seriesName?.slice(0, 4) || '',
		// 		distance: 20
		// 	},
		// 	emphasis: {
		// 		focus: 'series'
		// 	},
		// 	data: [
		// 		[5, 0.994],
		// 		[6, 0.997],
		// 		[15, 0.997],
		// 		[16, 1],
		// 		[17, 0.994],
		// 		[18, 0.994],
		// 		[19, 1],
		// 		[20, 1],
		// 		[22, 0.994],
		// 		[23, 0.994],
		// 		[24, 0.997],
		// 		[25, 0.997],
		// 		[26, 0.994],
		// 		[27, 0.997],
		// 		[28, 0.994],
		// 		[29, 0.997],
		// 		[30, 0.997]
		// 	]
		// }
	]
};

// 不同数据集的比较结果1
export const chatDifferentOption1: ECOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		left: '72px'
	},
	legend: {
		data: ['mRNA', 'IncRNA', 'DM', 'mRNA+DM', 'miRNA', 'ncRNA', 'Transcriptomic', 'TDS']
	},
	xAxis: [
		{
			type: 'category',
			axisTick: { show: false },
			// data: ['BRCA_21', 'LUAD_12', 'KIRC_16'],
			data: ['BRCA_21']
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

// 不同数据集的比较结果2
export const chatDifferentOption2: ECOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		left: '72px'
	},
	legend: {
		data: ['mRNA', 'IncRNA', 'DM', 'mRNA+DM', 'miRNA', 'ncRNA', 'Transcriptomic', 'TDS']
	},
	xAxis: [
		{
			type: 'category',
			axisTick: { show: false },
			data: ['BRCA_21']
		}
	],
	yAxis: [
		{
			name: 'F1(%)',
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
			data: [99.5, 99.0, 99.5]
		},
		{
			name: 'IncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.2, 99.6, 99.3]
		},
		{
			name: 'DM',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.1, 99.7, 99.7]
		},
		{
			name: 'mRNA+DM',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.6, 99.6, 99.6]
		},
		{
			name: 'miRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [98.4, 98.1, 98.8]
		},
		{
			name: 'ncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.2, 99.6, 99.4]
		},
		{
			name: 'Transcriptomic',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.3, 99.5, 99.5]
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

// 不同数据集的比较结果3
export const chatDifferentOption3: ECOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		data: ['mRNA', 'IncRNA', 'DM', 'mRNA+DM', 'miRNA', 'ncRNA', 'Transcriptomic', 'TDS']
	},
	grid: {
		left: '72px'
	},
	xAxis: [
		{
			type: 'category',
			axisTick: { show: false },
			data: ['BRCA_21']
		}
	],
	yAxis: [
		{
			name: 'Specificity(%)',
			nameTextStyle: { padding: [0, 0, 20, 0] },
			nameLocation: 'middle',
			type: 'value',
			min: 80,
			max: 100,
			interval: 2.5,
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
			data: [96, 87.5, 97]
		},
		{
			name: 'IncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [93.2, 91.5, 94.5]
		},
		{
			name: 'DM',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [94.7, 97.2, 99.3]
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
			data: [83.2, 81, 90]
		},
		{
			name: 'ncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [90.3, 98, 94.5]
		},
		{
			name: 'Transcriptomic',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [92, 96.5, 97.3]
		},
		{
			name: 'TDS',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [100, 100, 100]
		}
	]
};

// 不同数据集的比较结果4
export const chatDifferentOption4: ECOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		data: ['mRNA', 'IncRNA', 'DM', 'mRNA+DM', 'miRNA', 'ncRNA', 'Transcriptomic', 'TDS']
	},
	grid: {
		left: '72px'
	},
	xAxis: [
		{
			type: 'category',
			axisTick: { show: false },
			data: ['BRCA_21']
		}
	],
	yAxis: [
		{
			name: 'Recall/Sensitivity(%)',
			nameTextStyle: { padding: [0, 0, 20, 0] },
			nameLocation: 'middle',
			type: 'value',
			min: 97.5,
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
			data: [99.5, 99.4, 99.6]
		},
		{
			name: 'IncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.4, 99.2, 99.4]
		},
		{
			name: 'DM',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [98.9, 99.8, 99.7]
		},
		{
			name: 'mRNA+DM',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.4, 99.75, 99.7]
		},
		{
			name: 'miRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [98.6, 98.5, 99.1]
		},
		{
			name: 'ncRNA',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.5, 99.6, 99.6]
		},
		{
			name: 'Transcriptomic',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.4, 99.6, 99.4]
		},
		{
			name: 'TDS',
			type: 'bar',
			barGap: 0,
			emphasis: {
				focus: 'series'
			},
			data: [99.6, 100, 100]
		}
	]
};

// 不同数据集的比较结果-热力图
const cancerValue = [
	'BRCA\nAccuracy',
	'BRCA\nSpecificity',
	'BRCA\nSensitivity',
	'BRCA\nF1-score'
	// 'LUAD\nAccuracy',
	// 'LUAD\nSpecificity',
	// 'LUAD\nSensitivity',
	// 'LUAD\nF1-score',
	// 'KIRC\nAccuracy',
	// 'KIRC\nSpecificity',
	// 'KIRC\nSensitivity',
	// 'KIRC\nF1-score'
];
const cancerType = ['mRNA', 'IncRNA', 'DM', 'mRNA+DM', 'miRNA', 'ncRNA', 'Transcriptomic', 'TDS'];

export const chatHeatmapOption: ECOption = {
	tooltip: {
		position: 'top'
	},
	grid: {
		width: 'auto',
		height: '80%',
		left: '120px',
		top: 0
	},
	xAxis: {
		type: 'category',
		data: cancerValue,
		splitArea: {
			show: true
		},
		axisLabel: {
			fontSize: 8
		}
	},
	yAxis: {
		type: 'category',
		data: cancerType,
		splitArea: {
			show: true
		},
		axisLabel: {
			// fontSize: 12,
			margin: 4
		}
	},
	visualMap: {
		min: 83,
		max: 100,
		calculable: true,
		orient: 'horizontal',
		left: 'center',
		bottom: '5%',
		itemHeight: 360,
		itemWidth: 16
	},
	series: [
		{
			name: '比较结果',
			type: 'heatmap',
			data: [
				[0, 0, 99.17],
				[0, 1, 97.19],
				[0, 2, 98.84],
				[0, 3, 98.6],
				[0, 4, 98.42],
				[0, 5, 98.68],
				[0, 6, 99.3],
				[0, 7, 99.65],

				[1, 0, 96.46],
				[1, 1, 83.19],
				[1, 2, 93.87],
				[1, 3, 90.27],
				[1, 4, 94.79],
				[1, 5, 92.04],
				[1, 6, 98.8],
				[1, 7, 100],

				[2, 0, 99.45],
				[2, 1, 98.63],
				[2, 2, 99.36],
				[2, 3, 99.45],
				[2, 4, 98.86],
				[2, 5, 99.36],
				[2, 6, 99.36],
				[2, 7, 99.61],

				[3, 0, 99.54],
				[3, 1, 98.63],
				[3, 2, 99.36],
				[3, 3, 99.23],
				[3, 4, 99.11],
				[3, 5, 99.27],
				[3, 6, 99.61],
				[3, 7, 99.81],

				[4, 0, 98.26],
				[4, 1, 96.7],
				[4, 2, 98.44],
				[4, 3, 99.48],
				[4, 4, 99.6],
				[4, 5, 99.31],
				[4, 6, 99.37],
				[4, 7, 100],

				[5, 0, 88.14],
				[5, 1, 81.36],
				[5, 2, 91.53],
				[5, 3, 98.31],
				[5, 4, 96.88],
				[5, 5, 96.61],
				[5, 6, 90.48],
				[5, 7, 100],

				[6, 0, 99.42],
				[6, 1, 98.45],
				[6, 2, 99.23],
				[6, 3, 99.61],
				[6, 4, 99.78],
				[6, 5, 99.61],
				[6, 6, 99.78],
				[6, 7, 100],

				[7, 0, 99.04],
				[7, 1, 98.17],
				[7, 2, 99.13],
				[7, 3, 99.71],
				[7, 4, 99.78],
				[7, 5, 99.61],
				[7, 6, 9.67],
				[7, 7, 100],

				[8, 0, 99.34],
				[8, 1, 98.01],
				[8, 2, 98.84],
				[8, 3, 99],
				[8, 4, 99.58],
				[8, 5, 99.17],
				[8, 6, 99.42],
				[8, 7, 100],

				[9, 0, 97.22],
				[9, 1, 90.28],
				[9, 2, 94.44],
				[9, 3, 94.44],
				[9, 4, 99.38],
				[9, 5, 97.22],
				[9, 6, 95.83],
				[9, 7, 100],

				[10, 0, 99.62],
				[10, 1, 99.06],
				[10, 2, 99.44],
				[10, 3, 99.62],
				[10, 4, 99.69],
				[10, 5, 99.44],
				[10, 6, 99.69],
				[10, 7, 100],

				[11, 0, 99.62],
				[11, 1, 98.87],
				[11, 2, 99.34],
				[11, 3, 99.44],
				[11, 4, 99.69],
				[11, 5, 99.53],
				[11, 6, 99.69],
				[11, 7, 100]
			],
			label: {
				show: true
			},
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
};
