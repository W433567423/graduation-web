import type {
	// 系列类型的定义后缀都为 SeriesOption
	BarSeriesOption,
	HeatmapSeriesOption,
	LineSeriesOption
} from 'echarts/charts';
import { BarChart, HeatmapChart, LineChart } from 'echarts/charts';
import type {
	DatasetComponentOption,
	GridComponentOption,
	// 组件类型的定义后缀都为 ComponentOption
	TitleComponentOption,
	TooltipComponentOption
} from 'echarts/components';
import {
	// 数据集组件
	DatasetComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent,
	VisualMapComponent
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| DatasetComponentOption
	| HeatmapSeriesOption
>;

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	BarChart,
	LineChart,
	HeatmapChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
	LegendComponent,
	ToolboxComponent,
	VisualMapComponent
]);

export default echarts;
