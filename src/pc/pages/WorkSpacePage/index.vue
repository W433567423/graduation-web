<!--
* DONE
* @description: test 组件
* @author: tutu
* @time: 2024-03-07 15:08:33
-->
<template>
	<a-layout>
		<PcHeader><h2 class="color-red">项目空间</h2></PcHeader>

		<a-layout>
			<!-- 侧边栏 -->
			<a-layout-sider
				breakpoint="lg"
				collapsible
				:collapsed="collapsed"
				@collapse="onCollapse"
				:width="220">
				<div class="action-menu-button-wrap">
					<a-button class="p-0! gap-12px" type="primary" @click="router.replace('/pc/dash')">
						<icon-reply />
						{{ collapsed ? '' : '返回项目面板' }}
					</a-button>
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
					<a-button class="p-0! gap-12px" type="primary" @click="handleRunProject">
						<icon-play-arrow />
						{{ collapsed ? '' : '运行项目' }}
					</a-button>
				</div>
			</a-layout-sider>
			<!-- 主要内容 -->
			<a-spin :loading="loadingStatus" class="w100% relative">
				<a-layout-content class="content-wrap">
					<!-- TODO面包屑 -->
					<a-breadcrumb class="pt-20px pl-20px">
						<a-breadcrumb-item>todo</a-breadcrumb-item>
						<a-breadcrumb-item>todo</a-breadcrumb-item>
						<a-breadcrumb-item>todo</a-breadcrumb-item>
					</a-breadcrumb>
					<div class="content-inner-wrap">
						<a-dropdown
							trigger="contextMenu"
							alignPoint
							:style="{ display: 'block' }"
							v-for="(item, index) in dataList"
							:key="index">
							<a-card
								hoverable
								class="folder-wrap"
								@click="handleClickItem(item.isFolder, item.id, item.mimetype)">
								<icon-folder class="file-icon color-yellow!" v-if="item.isFolder" />
								<template v-else>
									<icon-file class="file-icon" v-if="item.mimetype === ''" />
									<icon-file-image
										class="file-icon color-pink!!"
										v-else-if="item.mimetype === 'image/jpeg'" />
									<icon-file-video
										class="file-icon color-green!"
										v-else-if="item.mimetype === 'video/mp4'" />
									<icon-file class="file-icon" v-else />
								</template>
								<div class="file-name">{{ item.name }}</div>
							</a-card>
							<template #content>
								<a-doption @click="handleSetIndex(item.fileName)">设置为运行入口</a-doption>
								<a-doption>删除文件 TODO</a-doption>
								<a-doption>重命名文件 TODO</a-doption>
							</template>
						</a-dropdown>
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
	<!-- 项目运行结果 -->
	<a-modal
		popup-container="#parentNode"
		:visible="runCodeVisible"
		:simple="true"
		:mask-closable="false"
		modalClass="w80vw! h80vh!"
		:body-style="{ height: 'calc(100% - 52px)' }"
		@ok="runCodeVisible = false"
		:esc-to-close="false"
		:hide-cancel="true"
		:ok-text="isSocketing ? '项目正在运行中...' : '关闭'"
		:hide-title="true"
		:ok-loading="isSocketing">
		<a-scrollbar
			id="modalScrollbar"
			class="overflow-auto overflow-y-scroll w100% h100%"
			outer-class="h100%  w100%">
			<div
				v-for="(e, i) in resultArr"
				:key="i"
				:class="[
					'color-gray whitespace-nowrap w-auto',
					i === 0 ? 'color-green' : '',
					i > resultArr.length - 3 ? 'color-pink' : ''
				]">
				<span>{{ i }}</span>
				--{{ e }}
			</div>
		</a-scrollbar>
	</a-modal>
</template>

<script lang="ts" setup>
import router from '@/router';
import { getWorkFileMenu, postNewFile, postNewFolder } from '@/services/files.api';
import type { IFileType, IGetFileMenuRes } from '@/services/interfaces/files.d';
import { patchProjectConfig, postRunProject } from '@/services/projects.api';
import { socket } from '@/utils/socket';
import { Notification } from '@arco-design/web-vue';
import PcHeader from '@pc/components/PcHeader/index.vue';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // 路由

const collapsed = ref(false); // 侧边栏是否折叠
const onCollapse = (val: boolean) => (collapsed.value = val); // 折叠事件
const isSocketing = ref(false); // 是否正在连接socket

const dataList = ref<IGetFileMenuRes[]>([]); // 项目菜单
const parentId = ref(0); // 父目录id
const projectId = ref(0); // 项目id

const loadingStatus = ref(false); // loading
const newFolderVisible = ref(false); // 新建文件夹弹窗
const newFileVisible = ref(false); // 新建文件弹窗
const runCodeVisible = ref(false); // 运行结果弹窗
const newFolderName = ref(''); // 新建文件夹名称
const newFileName = ref(''); // 新建文件名称

const resultArr = ref<string[]>([]);
/**
 * DONE
 * @description 刷新列表
 * @author tutu
 * @time 2024-03-23 09:49:03
 */
const flashMenu = async () => {
	loadingStatus.value = true;
	parentId.value = Number(route.query.parentId);
	let res = await getWorkFileMenu(parentId.value);
	if (!res?.length) {
		res = await getWorkFileMenu(parentId.value);
	}
	// 排序,文件夹在前
	dataList.value = res?.sort((a, b) => Number(b.isFolder) - Number(a.isFolder));

	loadingStatus.value = false;
};
/**
 * DONE
 * @description 新建文件夹
 * @author tutu
 * @time 2024-03-23 09:49:35
 */
const handleNewFolder = async () => {
	const res = await postNewFolder(newFolderName.value, parentId.value);
	if (res.code === 200)
		Notification.success({
			content: res.msg,
			duration: 1500,
			onClose: async () => {
				await flashMenu();
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
			content: res.msg,
			duration: 1500,
			onClose: async () => {
				await flashMenu();
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
const handleClickItem = async (isFold: boolean, fileId: number, type: IFileType) => {
	console.log('🚀 ~ handleClickFold ~', isFold, type);
	if (isFold) {
		await router.push({ query: { parentId: fileId, projectId: projectId.value } });
		flashMenu();
	} else {
		// TODO 文件类型（查看图片/视频/等）
	}
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
/**
 * DONE
 * @description 设置为运行入口 功能未实现，待后续开发
 * @author tutu
 * @time 2024-03-27 10:49:05
 * @param {string} indexFile	入口文件
 */
const handleSetIndex = async (indexFile: string) => {
	await patchProjectConfig(projectId.value, {
		indexFile
	});
	Notification.success({
		content: '设置成功',
		duration: 1500
	});
};
/**
 * DONE
 * @description 运行项目
 * @author tutu
 * @time 2024-03-27 11:50:03
 */
const handleRunProject = async () => {
	const res = await postRunProject(projectId.value);
	if (!res.data) {
		Notification.error({
			content: res.msg,
			duration: 3000
		});
	} else {
		runCodeVisible.value = true;
		const scrollElement = document.querySelector('#modalScrollbar')!;
		isSocketing.value = true;
		resultArr.value = [];
		socket.connect();
		const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
		resultArr.value.push(`${startTime}: 项目开始运行!`);
		socket.on('runCode', (e: any) => {
			console.log('🚀 ~ socket.on ~ e:', e);
			if (e !== 'tutu~end') {
				resultArr.value.push(e);
				scrollElement.scrollTop = scrollElement.scrollHeight;
			} else {
				const endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
				resultArr.value.push(`${endTime}: 项目运行结束!`);
				resultArr.value.push(`总耗时:${dayjs(endTime).diff(startTime, 'second')}s,项目运行结束!`);
				socket.disconnect();
				isSocketing.value = false;
				scrollElement.scrollTop = scrollElement.scrollHeight;

				Notification.success({
					content: '项目运行成功',
					duration: 3000
				});
			}
		});
	}
};
onMounted(async () => {
	projectId.value = Number(route.query.projectId);
	flashMenu();
	window.addEventListener(
		'hashchange',
		async () => {
			await flashMenu();
		},
		false
	);
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
