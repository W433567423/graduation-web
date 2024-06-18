<!--
* DONE
* @description: 入口 组件
* @author: tutu
* @time: 2024-06-18 20:40:47
-->
<template>
	<div class="index-wrap">
		<div
			v-for="(e, i) in menuList"
			:key="i"
			:class="['menu-wrap']"
			:style="{ backgroundColor: e.color }"
			@click="handleInter(e)">
			{{ e.name }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// 产生随机颜色六位哈希值
const randomColor = () => {
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};

interface IMenuItem {
	name: string;
	path: string;
	color: string;
}
// 目录
const menuList: Ref<IMenuItem[]> = ref([
	{ name: '烹饪', path: 'cook', color: randomColor() },
	{ name: '俄罗斯方块', path: '', color: randomColor() }
]);

const handleInter = (e: IMenuItem) => {
	router.push({ path: e.path });
};
</script>

<style lang="less" scoped>
.index-wrap {
	display: flex;
	.menu-wrap {
		width: 100px;
		height: 100px;
		margin: 10px;
		line-height: 100px;
		text-align: center;
		border-radius: 10%;
	}
}
</style>
