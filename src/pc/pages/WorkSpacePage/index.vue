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
					<a-button type="primary" @click="newFolderVisible = true">
						<icon-folder-add class="mr-12px" />
						新建文件夹
					</a-button>
					<a-button type="primary" @click="newFileVisible = true">
						<icon-drive-file class="mr-12px" />
						新建文件
					</a-button>
					<a-button type="primary" @click="handleUploadFile">
						<icon-upload class="mr-12px" />
						上传文件
					</a-button>
				</div>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-spin :loading="loadingStatus">
				<a-layout-content class="content-wrap">
					<div class="content-inner-wrap">
						<a-card hoverable class="folder-wrap" v-for="(item, index) in dataList" :key="index">
							<icon-folder class="folder-icon" v-if="item.isFolder" />
							<icon-file class="folder-icon" v-else />
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
		<a-input v-model="newFileName" placeholder="请输入文件名称" />
	</a-modal>
</template>

<script lang="ts" setup>
import { getWorkFileMenu, postNewFile, postNewFolder } from '@/services/files.api';
import type { IGetFileMenuRes } from '@/services/interfaces/files.d';
import { Notification } from '@arco-design/web-vue';
import PcHeader from '@pc/components/PcHeader/index.vue';
import { onMounted, ref, type VNodeRef } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const newFileFormRef: VNodeRef | undefined = ref();

const collapsed = ref(false);
const onCollapse = (val: boolean) => (collapsed.value = val);

const dataList = ref<IGetFileMenuRes[]>([]); // 项目菜单
const parentId = ref(0); // 父级id

const loadingStatus = ref(false); // loading
const newFolderVisible = ref(false); // 新建文件夹弹窗
const newFileVisible = ref(false); // 新建文件弹窗
const newFolderName = ref(''); // 新建文件夹名称
const newFileName = ref(''); // 新建文件名称

/**
 * DONE
 * @description 刷新列表
 * @author tutu
 * @time 2024-03-23 09:49:03
 * @param {number} parentId 父级id
 */
const flashMenu = async (parentId: number) => {
	dataList.value = await getWorkFileMenu(parentId);
};
/**
 * DONE
 * @description 新建文件夹
 * @author tutu
 * @time 2024-03-23 09:49:35
 */
const handleNewFolder = async () => {
	loadingStatus.value = true;
	const res = await postNewFolder(newFolderName.value, parentId.value);
	if (res.code === 200)
		Notification.success({
			content: res.message,
			duration: 1000,
			onClose: async () => {
				await flashMenu(parentId.value);
				loadingStatus.value = false;
			}
		});
};

/**
 * DONE
 * @description 新建文件
 * @author tutu
 * @time 2024-03-23 09:50:03
 */
const handleNewFile = async () => {
	await postNewFile({ fileName: newFileName.value, parentId: parentId.value });
	flashMenu(parentId.value);
};

/**
 * TODO
 * @description 上传文件功能
 * @author tutu
 * @time 2024-03-23 09:50:11
 */
const handleUploadFile = () => {
	console.log('🚀 ~ handleUploadFile ~ handleUploadFile');
};

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
