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
			:class="['menu-wrap', 'color-white']"
			:style="{ backgroundColor: e.color }"
			@click="handleInter(e)">
			{{ e.name }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { showNotify } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { type IMenuItem } from './type';
const router = useRouter();

// 产生随机主色调
const randomColor = (): string => {
	const r = Math.random();
	if (r < 0.1) return randomColor();
	const color = Math.floor(r * 0xffffff).toString(16);
	return `#${color}`;
};

// 目录
const menuList = ref<IMenuItem[]>([
	{ name: '烹饪', path: 'cook', color: randomColor() },
	{ name: '毕设系统', path: '', color: randomColor() },
	{ name: '俄罗斯方块', path: '', color: randomColor() }
]);

const handleInter = (e: IMenuItem) => {
	if (!e.path) {
		showNotify({ type: 'danger', message: '已关闭，待整合，敬请期待' });
		console.log('🚀 ~ handleInter ~ showNotify:', showNotify);
	}
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
