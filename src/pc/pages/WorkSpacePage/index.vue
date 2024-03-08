<!--
* DONE
* @description: test 组件
* @author: tutu
* @time: 2024-03-07 15:08:33
-->
<template>
	<a-layout>
		<PcHeader><h2 class="color-red">title</h2></PcHeader>

		<a-layout>
			<!-- 侧边栏 -->
			<a-layout-sider
				breakpoint="lg"
				collapsible
				:collapsed="collapsed"
				@collapse="onCollapse"
				:width="220">
				<a-tree :data="treeData" blockNode></a-tree>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-layout-content class="content-code-wrap"></a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup>
import PcHeader from '@pc/components/PcHeader/index.vue';
import { ref } from 'vue';

const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);

const treeData = [
	{
		title: 'Trunk 0-0',
		key: '0-0',
		children: [
			{
				title: 'Leaf',
				key: '0-0-1'
			},
			{
				title: 'Branch 0-0-2',
				key: '0-0-2',
				children: [
					{
						title: 'Leaf',
						key: '0-0-2-1'
					}
				]
			}
		]
	},
	{
		title: 'Trunk 0-1',
		key: '0-1',
		children: [
			{
				title: 'Branch 0-1-1',
				key: '0-1-1',
				children: [
					{
						title: 'Leaf',
						key: '0-1-1-1'
					},
					{
						title: 'Leaf',
						key: '0-1-1-2'
					}
				]
			},
			{
				title: 'Leaf',
				key: '0-1-2'
			}
		]
	}
];
</script>

<style lang="less" scoped>
.content-code-wrap {
	height: calc(100vh - 64px);
}

.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}
</style>
