<!--
* DONE
* @description: test 组件
* @author: tutu
* @time: 2024-03-07 15:08:33
-->
<template>
	<a-layout>
		<PcHeader><h2 class="color-red">空间</h2></PcHeader>

		<a-layout>
			<!-- 侧边栏 -->
			<a-layout-sider
				breakpoint="lg"
				collapsible
				:collapsed="collapsed"
				@collapse="onCollapse"
				:width="220">
				<div class="action-menu-button-wrap">
					<a-button type="primary" @click="newFolderVisible = true">新建文件夹</a-button>
					<a-button type="primary" @click="newFileVisible = true">新建文件</a-button>
					<a-button type="primary">上传文件</a-button>
				</div>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-spin :loading="loadingStatus">
				<a-layout-content class="content-wrap">
					<div class="content-inner-wrap">
						<a-card hoverable class="folder-wrap" v-for="(item, index) in dataList" :key="index">
							<icon-folder class="folder-icon" />
							{{ item.fileName }}
						</a-card>
					</div>
				</a-layout-content>
			</a-spin>
		</a-layout>
	</a-layout>

	<!-- 弹窗 新建文件夹 -->
	<a-modal v-model:visible="newFolderVisible" @ok="handleNewFolder" title="新建文件夹">
		<a-input v-model="newFolderName" placeholder="请输入文件夹名称" />
	</a-modal>
	<!-- 弹窗 新建文件 -->
	<a-modal v-model:visible="newFileVisible" @ok="handleNewFile" title="新建文件">
		<NewFileForm />
	</a-modal>
</template>

<script lang="ts" setup>
import { getWorkFileMenu, postNewFolder } from '@/services/files.api';
import type { IGetFileMenuRes } from '@/services/interfaces/files.d';
import { Notification } from '@arco-design/web-vue';
import PcHeader from '@pc/components/PcHeader/index.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import NewFileForm from './cpns/NewFileForm.vue';

const route = useRoute();

const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);

const dataList = ref<IGetFileMenuRes[]>([]); // 项目菜单
const parentId = ref(0); // 父级id

const loadingStatus = ref(false); // loading
const newFolderVisible = ref(false); // 新建文件夹弹窗
const newFileVisible = ref(false); // 新建文件弹窗
const newFolderName = ref(''); // 新建文件夹名称
const newFileName = ref(''); // 新建文件名称

// 刷新列表
const flashMenu = async (parentId: number) => {
	dataList.value = await getWorkFileMenu(parentId);
};
// 新建文件夹
const handleNewFolder = async () => {
	loadingStatus.value = true;
	const res = await postNewFolder(newFolderName.value, parentId.value);
	Notification.success({
		content: res.message,
		duration: 1000,
		onClose: async () => {
			await flashMenu(parentId.value);
			loadingStatus.value = false;
		}
	});
};

// 新建文件
const handleNewFile = () => {
	console.log('新建文件');
};

// 获取项目菜单
onMounted(async () => {
	parentId.value = Number(route.query.rootFolderId);
	flashMenu(parentId.value);
});
</script>

<style lang="less" scoped>
// 侧边按钮
.action-menu-button-wrap {
	padding: 12px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	gap: 12px;
}
// 主要内容
.content-wrap {
	height: calc(100vh - 64px);
	.content-inner-wrap {
		padding: 20px;
		box-sizing: border-box;
		gap: 12px;
		display: flex;
		flex-wrap: wrap;
		.folder-wrap {
			width: 200px;
			height: 64px;
			border-radius: 8px;
			cursor: pointer;
			:deep(.arco-card-body) {
				display: flex;
				align-items: center;
			}
			.folder-icon {
				width: 32px;
				height: 32px;
				margin-right: 12px;
			}
		}
	}
}

.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}
</style>
