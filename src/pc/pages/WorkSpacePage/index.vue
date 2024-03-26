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
					<a-button class="p-0! gap-12px" type="primary" @click="newFolderVisible = true">
						<icon-folder-add />
						{{ collapsed ? '' : '新建文件夹' }}
					</a-button>
					<a-button class="p-0! gap-12px" type="primary" @click="newFileVisible = true">
						<icon-drive-file />
						{{ collapsed ? '' : '新建文件' }}
					</a-button>
					<a-button class="p-0! gap-12px" type="primary" @click="handleUploadFile">
						<icon-upload />
						{{ collapsed ? '' : '上传文件' }}
					</a-button>
				</div>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-spin :loading="loadingStatus">
				<a-layout-content class="content-wrap">
					<div class="content-inner-wrap">
						<a-card
							hoverable
							class="folder-wrap"
							v-for="(item, index) in dataList"
							:key="index"
							@click="handleClickItem(item.mimetype)">
							<icon-folder class="file-icon color-yellow!" v-if="item.isFolder" />
							<template v-else>
								<icon-file class="file-icon" v-if="item.mimetype === ''" />
								<icon-file-image
									class="file-icon color-pink!!"
									v-else-if="item.mimetype === 'image/jpeg'" />
								<icon-file-video class="file-icon color-green!" v-else-if="item.mimetype === 'video/mp4'" />
								<icon-file class="file-icon" v-else />
							</template>
							<div class="file-name">{{ item.fileName }}</div>
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
import type { IFileType, IGetFileMenuRes } from '@/services/interfaces/files.d';
import { Notification } from '@arco-design/web-vue';
import PcHeader from '@pc/components/PcHeader/index.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // 路由

const collapsed = ref(false); // 侧边栏是否折叠
const onCollapse = (val: boolean) => (collapsed.value = val); // 折叠事件

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
	const res = await getWorkFileMenu(parentId);
	// 排序,文件夹在前
	dataList.value = res.sort((a, b) => Number(b.isFolder) - Number(a.isFolder));
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
			duration: 1500,
			onClose: async () => {
				await flashMenu(parentId.value);
				loadingStatus.value = false;
				newFolderName.value = '';
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
	const res = await postNewFile({ fileName: newFileName.value, parentId: parentId.value });
	if (res.code === 200)
		Notification.success({
			content: res.message,
			duration: 1500,
			onClose: async () => {
				await flashMenu(parentId.value);
				loadingStatus.value = false;
				newFileName.value = '';
			}
		});
};

/**
 * DONE
 * @description 点击文件夹/文件
 * @author tutu
 * @time 2024-03-23 17:38:14
 */
const handleClickItem = (type: IFileType) => {
	console.log('🚀 ~ handleClickFold ~', type);
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
	parentId.value = Number(route.query.parentId);
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
			.file-icon {
				width: 32px;
				height: 32px;
				margin-right: 12px;
				flex-shrink: 0;
			}
			.file-name {
				text-overflow: ellipsis;
				overflow: hidden;
				word-break: break-all;
				white-space: nowrap;
				width: 100%;
			}
		}
	}
}

.a-menu-vertical-demo:not(.a-menu--collapse) {
	height: calc(100vh - 64px);
}
</style>
