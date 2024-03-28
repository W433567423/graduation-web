<!--
* DONE
* @description: ProgramItem 组件
* @author: tutu
* @time: 2024/1/13 17:37
-->

<template>
	<div class="program-table-wrap">
		<!-- 批量操作 -->
		<div v-if="selectedKeys.length" class="optional-menu">
			<a-button type="primary" @click="disableProject(selectedKeys, true)">禁用所选</a-button>
			<a-button type="primary" @click="openDeleteDialog(selectedKeys)">删除所选</a-button>
		</div>

		<a-scrollbar style="width: 100%; overflow: auto" outer-class="w-100%">
			<!-- 表格部分 -->
			<a-table
				row-key="id"
				:columns="columns"
				:data="list"
				stripe
				scrollbar
				:scroll="{ y: '100%' }"
				class="min-w-960px"
				sticky-header
				summary-text="操作"
				:pagination="false"
				v-model:selectedKeys="selectedKeys"
				:row-selection="rowSelection">
				<!-- 列内容 -->
				<template #num="{ i }">{{ i }}</template>

				<template #status="{ record }: { record: IProjectListItemRes }">
					<template v-if="record.disable">
						<a-tooltip content="已被禁用">
							<icon-stop class="cursor-help text-red!" />
						</a-tooltip>
					</template>

					<template v-else>
						<icon-pause class="cursor-pointer" />
						<icon-play-arrow class="cursor-pointer" />
					</template>
				</template>

				<template #action="{ record }: { record: IProjectListItemRes }">
					<a-dropdown trigger="hover" :popup-max-height="false">
						<a-button circle>
							<template #icon>
								<icon-more />
							</template>
						</a-button>

						<template #content>
							<a-doption
								@click="emits('edit:project', record)"
								:disabled="record.projectType === 'complex'">
								<icon-code />
								编辑代码
							</a-doption>
							<a-doption @click="emits('into:project', record)" v-if="record.projectType === 'complex'">
								<icon-code />
								进入工作目录
							</a-doption>
							<a-doption @click="openRenameDialog(record)">
								<icon-edit />
								重命名
							</a-doption>
							<a-doption @click="emits('edit:projectType', record)">
								<icon-edit />
								修改代码类型
							</a-doption>
							<a-doption @click="openDeleteDialog([record.id])">
								<icon-delete />
								删除项目
							</a-doption>
							<a-doption @click="disableProject([record.id], !record.disable)">
								<icon-stop />
								{{ record.disable ? '启用' : '禁用' }}
							</a-doption>
						</template>
					</a-dropdown>
				</template>

				<template #lastStatus="{ record }: { record: IProjectListItemRes }">
					{{ mapRunStatus(record.lastStatus) }}
				</template>
			</a-table>
		</a-scrollbar>
	</div>
	<!-- 弹框部分 -->
	<a-modal
		v-model:visible="renameDialogFormVisible"
		:on-before-ok="renameProject"
		title="重命名项目"
		@cancel="renameDialogFormVisible = false">
		<a-form ref="formRef" :model="form" :rules="formRules">
			<a-form-item field="newName" label="新名称" required validate-trigger="blur">
				<a-input v-model="form.newName" autocomplete="off" clearable placeholder="请输入新项目名" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts" setup>
import type { IProjectListItemRes } from '@/services/interfaces/projects';
import { deleteProjectByIds, disableProjectById, patchProjectConfig } from '@/services/projects.api';
import { mapRunStatus } from '@/utils';
import {
	Modal,
	Notification,
	type FieldRule,
	type FormInstance,
	type TableColumnData,
	type TableData,
	type TableRowSelection
} from '@arco-design/web-vue';
import { ref, type Ref } from 'vue';

interface IProps {
	list: IProjectListItemRes[];
}

const formRef = ref<FormInstance>();
const emits = defineEmits(['update:list', 'edit:project', 'edit:projectType', 'into:project']);
const selectedKeys = ref<number[]>([]);
const rowSelection: Ref<TableRowSelection> = ref({
	type: 'checkbox',
	showCheckedAll: true,
	onlyCurrent: false
});
const renameDialogFormVisible = ref(false); // 重命名对话框

const localProject: Ref<IProjectListItemRes | undefined> = ref(); // 当前操作的项目
const { list } = defineProps<IProps>();

const form = ref({
	newName: ''
}); // 项目的新名字
const formRules: Record<string, FieldRule<any> | Array<FieldRule<any>>> = {
	newName: [
		{ required: true, message: '名称不能为空' },
		{ maxLength: 12, message: '名称最长为12个字符' }
	]
}; // 项目的新名字

const columns: TableColumnData[] = [
	{ title: '序号', align: 'center', render: ({ rowIndex }) => rowIndex + 1, width: 60 },
	{ title: '状态', align: 'center', slotName: 'status', width: 60 },
	{ title: '项目名称', dataIndex: 'projectName' },
	{
		title: '创建时间',
		align: 'center',
		dataIndex: 'createTime',
		sortable: { sortDirections: ['ascend', 'descend'] }
	},
	{ title: '上一次运行时间', dataIndex: 'updateTime', sortable: { sortDirections: ['ascend', 'descend'] } },
	{
		title: '上一次运行状态',
		slotName: 'lastStatus',
		width: 144,
		align: 'center',
		filterable: {
			multiple: true,
			filters: [
				{
					text: '运行失败',
					value: '-1'
				},
				{
					text: '未运行',
					value: '0'
				},
				{
					text: '运行成功',
					value: '1'
				}
			],
			filter: (value: string[], record: TableData) => value.includes(String(record.lastStatus))
		}
	},
	{ title: '操作', slotName: 'action', align: 'center' }
];

// 打开重命名对话框
const openRenameDialog = (project: IProjectListItemRes) => {
	localProject.value = project;
	renameDialogFormVisible.value = true;
};
// 重命名项目功能
const renameProject: (done: (closed: boolean) => void) => boolean | Promise<boolean> = async () => {
	if (!formRef.value) return false;
	return await new Promise((resolve) => {
		void formRef.value!.validateField('newName', (errors) => {
			if (!errors) {
				void patchProjectConfig(localProject.value?.id!, { projectName: form.value.newName }).then(() => {
					renameDialogFormVisible.value = false;
					Notification.success({ content: '重命名成功' });
					emits('update:list');
					resolve(true);
				});
			} else resolve(false);
		});
	});
};

// 删除项目功能
const openDeleteDialog = (ids: number[]) => {
	Modal.warning({
		title: '删除项目',
		content: '是否要删除该项目，此操作一旦成功将无法撤回',
		onOk: () => {
			void deleteProjectByIds(ids).then(() => {
				Notification.success({ content: '删除项目成功' });
				emits('update:list');
			});
		}
	});
};

// 禁用项目功能
const disableProject = async (ids: number[], disable: boolean) => {
	await disableProjectById(ids, disable);
	Notification.success({ content: `${disable ? '禁用' : '启用'}项目成功` });
	emits('update:list');
};
</script>

<style lang="less" scoped>
.program-table-wrap {
	height: 100%;
	position: relative;

	.optional-menu {
		position: absolute;
		height: 48px;
		top: -68px;
		right: 0px;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: end;
		gap: 8px;
	}
}
</style>
