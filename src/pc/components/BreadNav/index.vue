<!--
* DONE
* @description: bread-nav 组件
* @author: tutu
* @time: 2024/1/16 16:58
-->
<template>
	<div class="bread-nav">
		<a-breadcrumb>
			<a-breadcrumb-item :to="routerMapString().url" class="nav-item">
				<template #separator>
					<icon-right />
				</template>
				{{ routerMapString().title }}
			</a-breadcrumb-item>
		</a-breadcrumb>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const routerMapString = () => {
	const renderData = { url: useRoute().path, title: '' };
	switch (useRoute().path) {
		case '/pc/dash':
			renderData.title = '面板';
			break;
		case '/pc/new':
			renderData.title = '新建项目';
			break;
		case '/pc/set':
			renderData.title = '设置';
			break;
	}
	return renderData;
};
</script>

<style lang="less" scoped>
.bread-nav {
	height: 48px;
	line-height: 48px;
	display: flex;
	align-items: center;
	background-color: #f6f6f9;
	padding-left: 12px;

	.nav-item :hover {
		cursor: pointer;
		color: #79bbff;
	}
}
</style>
