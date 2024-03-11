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
import { getProjectMenu } from '@/services/projects.api';
import { FormateTree } from '@/utils/handleMap.utils';
import { type TreeNodeData } from '@arco-design/web-vue';
import PcHeader from '@pc/components/PcHeader/index.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);

const treeData = ref<TreeNodeData[]>([]);

onMounted(async () => {
	const projectId = Number(route.query.id);
	const res = await getProjectMenu(projectId);
	treeData.value = FormateTree(res);
	console.log('🚀 ~ onMounted ~ treeData.value :', treeData.value);
});
</script>

<style lang="less" scoped>
.content-code-wrap {
	height: calc(100vh - 64px);
}

.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}
</style>
