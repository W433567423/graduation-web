<!--
* DONE
* @description: 制作方式 组件
* @author: tutu
* @time: 2024-06-18 21:15:43
-->
<template>
	<div class="make-wrap">
		<h2 class="text-center">红烧肉</h2>
		<van-image
			class="block! mx-auto"
			width="70%"
			src="https://th.bing.com/th/id/R.33f0fb1c94c216e8611af297909dede8?rik=gGqbiAeuU6hXHQ&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f50124%2f3243.jpg_wh860.jpg&ehk=9U6UREm9ddDQHGUL95jBE0IY8XjOBHKHVtTFFEVvhlM%3d&risl=&pid=ImgRaw&r=0"
			alt="菜品图片"
			round
			fit="scale-down"
			lazy-load />
		<van-collapse v-model="activeNames">
			<van-collapse-item title="材料" :name="1">
				<van-row class="font-bold text-black">
					<van-col span="16">食材</van-col>
					<van-col span="8" class="text-center">重量/数量</van-col>
				</van-row>
				<van-row v-for="(e, i) in materialList" :key="i">
					<van-col span="16">{{ e.name }}</van-col>
					<van-col span="8" class="text-center">
						<del v-if="e.notWant">{{ e.weight }}</del>
						<span v-else>{{ e.weight }}</span>
					</van-col>
				</van-row>
			</van-collapse-item>
			<van-collapse-item title="制作流程" :name="2">
				<van-steps class="w-auto" :active="activeStep">
					<van-step v-for="e in makeFlowList" :key="e.step" @click="handleChangeStep(e.step)">
						{{ e.title }}
					</van-step>
				</van-steps>
				<van-swipe ref="swiperRef" :show-indicators="false" @change="handleChangeStep">
					<van-swipe-item v-for="e in makeFlowList" :key="e.step">
						<van-tag type="success" v-if="e.fire">{{ e.fire }}</van-tag>
						<li v-if="typeof e.content === 'string'">
							{{ e.content }}
						</li>
						<ol class="list-decimal p-is-1rem" v-else-if="Array.isArray(e.content)">
							<li v-for="(item, index) in e.content" :key="index">
								{{ item }}
							</li>
						</ol>
						<van-tag mark type="primary" v-if="e.tip">Tips：{{ e.tip }}</van-tag>
					</van-swipe-item>
				</van-swipe>
			</van-collapse-item>
			<van-collapse-item title="笔记/评论" :name="3">
				在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
			</van-collapse-item>
		</van-collapse>
	</div>
</template>

<script lang="ts" setup>
import { type SwipeInstance } from 'vant';
import { ref } from 'vue';
import { type IMakeFlowItem } from './type';

const swiperRef = ref<SwipeInstance>();
const activeNames = ref([2]);
const activeStep = ref(0);
// 食材列表;eg:红烧肉
const materialList = ref([
	{ name: '五花肉', weight: '500g' },
	{ name: '姜', weight: '1小块' },
	{ name: '蒜', weight: '3瓣', notWant: true },
	{ name: '八角', weight: '2个' },
	{ name: '桂皮', weight: '2小片' },
	{ name: '香叶', weight: '四五片' },
	{ name: '冰糖', weight: '冰糖(8+4粒)' },
	{ name: '水/开水', weight: '适量' },
	{ name: '油', weight: '适量' },
	{ name: '生抽', weight: '适量' },
	{ name: '老抽', weight: '适量' },
	{ name: '料酒', weight: '适量' },
	{ name: '冰糖', weight: '适量' },
	{ name: '盐', weight: '适量' },
	{ name: '水/开水', weight: '适量' }
]);

// 制作流程
const makeFlowList = ref<IMakeFlowItem[]>([
	{
		step: 0,
		content: '锅烧热，烫猪皮至焦黑,切块备用(稍微大点)',
		title: '预处理'
	},
	{
		step: 1,
		content: '姜蒜切片，葱切段，八角桂皮香叶备用',
		title: '备料'
	},
	{
		step: 2,
		content: '放少许油，冰糖敲碎融化，不断搅拌，炒至金黄色，小气泡完全消失变成大气泡，加入开水，熬一分钟',
		title: '炒糖色',
		fire: '最小火'
	},
	{
		step: 3,
		content: '五花肉冷水下锅焯水，加入料酒去腥，一分钟后捞出控水',
		title: '焯水',
		fire: '未知'
	},
	{
		step: 4,
		content: '锅洗净烧热，加入油，五花肉下锅炒至五花肉颜色微黄出油',
		title: '炒肉',
		fire: '小火',
		tip: '热锅冷油，不能炒太干，猪油可储存'
	},
	{
		step: 5,
		content: [
			'葱姜香料下锅，炒出香味(约1分钟)',
			'锅边加入生抽酱油，翻炒至香味融合',
			'加入啤酒，加入糖色，加入足量开水没过五花肉',
			'加入冰糖，老抽调色'
		],
		title: '放调料',
		fire: '小火'
	},
	{
		step: 6,
		content: `盖上锅盖，小火慢炖(约40分钟)，放盐调味，继续炖25分钟`,
		title: '炖肉',
		fire: '小火'
	},
	{
		step: 7,
		content: `大火收汁`,
		title: '收汁',
		fire: '大火'
	}
]);

/**
 * DONE
 * @description 切换制作进度
 * @author tutu
 * @time 2024-06-18 23:33:53
 * @param {number} index - 切换的索引
 */
const handleChangeStep = (index: number) => {
	activeStep.value = index;
	console.log('🚀 ~', swiperRef.value);
	// 性能优化
	if (swiperRef.value?.state.active === index) return;
	swiperRef.value?.swipeTo(index);
};
</script>

<style lang="less" scoped>
.make-wrap {
	.van-swipe-item {
		padding: 0 10px 10px;
		box-sizing: border-box;
	}
	:deep(.van-steps) {
		padding: 10px 0 0;
		.van-step__title {
			overflow-x: hidden;
			text-wrap: nowrap;
		}
	}
}
</style>
