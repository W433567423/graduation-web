<!--
* DONE
* @description: 做菜菜单 组件
* @author: tutu
* @time: 2024-06-18 21:03:40
-->
<template>
	<div>
		<van-space fill>
			<van-button type="primary" @click="handleNew">新菜品</van-button>
		</van-space>
		<van-collapse v-model="activeNames">
			<van-collapse-item v-for="e in makeMethodList" :key="e.id" :title="e.name" :name="e.id">
				<van-grid>
					<van-grid-item icon="photo-o" text="红烧肉" />
				</van-grid>
			</van-collapse-item>
		</van-collapse>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref([4]);
// 菜的制作方式 溜、焖、烧、汆、蒸、炸酥、烩、扒、炖、爆、炒、砂锅、 拔丝
const makeMethodList = ref([
	{ name: '溜', id: 1 },
	{ name: '煮', id: 2 },
	{ name: '焖', id: 3 },
	{ name: '烧', id: 4 },
	{ name: '汆', id: 5 },
	{ name: '蒸', id: 6 },
	{ name: '炸酥', id: 7 },
	{ name: '烩', id: 8 },
	{ name: '扒', id: 9 },
	{ name: '炖', id: 10 },
	{ name: '爆', id: 11 },
	{ name: '炒', id: 12 },
	{ name: '砂锅', id: 13 },
	{ name: '拔丝', id: 14 }
]);

const handleNew = () => {
	console.log('新菜品');
};
</script>

<style lang="less" scoped></style>
