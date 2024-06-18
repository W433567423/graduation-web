<!--
* DONE
* @description: 做菜菜单 组件
* @author: tutu
* @time: 2024-06-18 21:03:40
-->
<template>
	<div>
		<div class="mx-auto w10rem">
			<van-button type="primary" class="w100%" @click="handleNew">新菜品</van-button>
		</div>
		<van-collapse v-model="activeNames">
			<van-collapse-item v-for="e in makeMethodList" :key="e.group_id" :title="e.name" :name="e.group_id">
				<van-grid class="grid-wrap">
					<van-grid-item icon="photo-o" text="红烧肉" @click="handleCook(1)">
						<van-image
							class="w100% aspect-ratio-3-4"
							src="https://th.bing.com/th/id/R.33f0fb1c94c216e8611af297909dede8?rik=gGqbiAeuU6hXHQ&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f50124%2f3243.jpg_wh860.jpg&ehk=9U6UREm9ddDQHGUL95jBE0IY8XjOBHKHVtTFFEVvhlM%3d&risl=&pid=ImgRaw&r=0" />
						<span class="mt4px">红烧肉</span>
					</van-grid-item>
				</van-grid>
			</van-collapse-item>
		</van-collapse>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const activeNames = ref([4]);
// 菜的制作方式 溜、焖、烧、汆、蒸、炸酥、烩、扒、炖、爆、炒、砂锅、 拔丝
const makeMethodList = ref([
	{ name: '溜', group_id: 1 },
	{ name: '煮', group_id: 2 },
	{ name: '焖', group_id: 3 },
	{ name: '烧', group_id: 4 },
	{ name: '汆', group_id: 5 },
	{ name: '蒸', group_id: 6 },
	{ name: '炸酥', group_id: 7 },
	{ name: '烩', group_id: 8 },
	{ name: '扒', group_id: 9 },
	{ name: '炖', group_id: 10 },
	{ name: '爆', group_id: 11 },
	{ name: '炒', group_id: 12 },
	{ name: '砂锅', group_id: 13 },
	{ name: '拔丝', group_id: 14 }
]);

const handleNew = () => {};

// 做菜具体页面
const handleCook = (id: number) => {
	router.push({ path: `/cook/make/${id}` });
};
</script>

<style lang="less" scoped>
.grid-wrap {
	:deep(.van-grid-item__content) {
		padding-bottom: 0;
	}
}
</style>
