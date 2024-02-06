<!--
* DONE
* @description: ProgramItem 组件
* @author: tutu
* @time: 2024/1/13 17:37
-->
<template>
  <a-table :columns="columns" :data="list" stripe>
    <template #action="{ record }: { record: IProjectListItem }">
      <a-dropdown trigger="hover">
        <a-button circle>
          <template #icon>
            <icon-more />
          </template>
        </a-button>
        <template #content>
          <a-doption @click="openRenameDialog(record)">
            <icon-edit />
            重命名
          </a-doption>
          <a-doption @click="openDeleteDialog(record.id)">
            <icon-delete />
            删除项目
          </a-doption>
          <a-doption>
            <icon-stop />
            禁用
          </a-doption>
        </template>
      </a-dropdown>
    </template>
    <template #lastStatus="{ record }: { record: IProjectListItem }">{{ mapRunStatus(record.lastStatus) }}</template>
  </a-table>
  <Modal v-model:visible="renameDialogFormVisible" :on-before-ok="renameProject" title="重命名项目"
    @cancel="renameDialogFormVisible = false">
    <a-form ref="formRef" :model="form" :rules="formRules">
      <a-form-item field="newName" label="新名称" required validate-trigger="blur">
        <a-input v-model="form.newName" autocomplete="off" clearable placeholder="请输入新项目名" />
      </a-form-item>
    </a-form>
  </Modal>
</template>

<script lang="ts" setup>
import type { IProjectListItem } from '@/services/interfaces/projects';
import { deleteProjectById, putReNameProject } from '@/services/projects.api';
import { mapRunStatus } from '@/utils';
import {
  Modal,
  Notification,
  type FieldRule,
  type FormInstance,
  type TableColumnData,
  type TableData
} from '@arco-design/web-vue';
import { ref, type Ref } from 'vue';

interface IProps {
  list: IProjectListItem[];
}

const formRef = ref<FormInstance>();
const emits = defineEmits(['update:list']);

const renameDialogFormVisible = ref(false); // 重命名对话框
const form = ref({
  newName: ''
}); // 项目的新名字
const formRules: Ref<Record<string, FieldRule<any> | Array<FieldRule<any>> | undefined>> = ref({
  newName: [
    { required: true, message: '名称不能为空' },
    { maxLength: 12, message: '名称最长为12个字符' }
  ]
}); // 项目的新名字
const localProject: Ref<IProjectListItem | undefined> = ref(); // 当前操作的项目
const { list } = defineProps<IProps>();

const columns: TableColumnData[] = [
  { title: '状态', align: 'center', dataIndex: 'name' },
  { title: '项目名称', dataIndex: 'projectName' },
  { title: '创建时间', align: 'center', dataIndex: 'createTime', sortable: { sortDirections: ['ascend', 'descend'] } },
  { title: '上一次运行时间', dataIndex: 'updateTime', sortable: { sortDirections: ['ascend', 'descend'] } },
  {
    title: '上一次运行状态', slotName: 'lastStatus', width: 144, align: 'center',
    filterable: {
      multiple: true,
      filters: [{
        text: '运行失败',
        value: '-1',
      }, {
        text: '未运行',
        value: '0',
      }, {
        text: '运行成功',
        value: '1',
      },],
      filter: (value: string[], record: TableData) =>
        value.includes(String(record.lastStatus))
    }
  },
  { title: '操作', slotName: 'action', align: 'center' }
];

// 打开重命名对话框
const openRenameDialog = (project: IProjectListItem) => {
  localProject.value = project;
  renameDialogFormVisible.value = true;
};
// 重命名项目功能
const renameProject: (done: (closed: boolean) => void) => boolean | Promise<boolean> = async () => {
  if (!formRef.value) return false;
  return await new Promise((resolve) => {
    void formRef.value!.validateField('newName', (errors) => {
      if (!errors) {
        void putReNameProject(localProject.value?.id!, form.value.newName).then(() => {
          renameDialogFormVisible.value = false;
          Notification.success({ content: '重命名成功' });
          emits('update:list');
          resolve(true);
        });
      } else resolve(false);
    });
  });
};

// 打开删除功能
const openDeleteDialog = (id: number) => {
  Modal.warning({
    title: '删除项目',
    content: '是否要删除该项目，此操作一旦成功将无法撤回',
    onOk: () => {
      void deleteProjectById(id).then(() => {
        Notification.success({ content: '删除项目成功' });
        emits('update:list');
      });
    }
  });
};
</script>

<style lang="less" scoped>
.program-list {
  border-radius: 8px;
  background-color: #f4f4f8;
  padding: 4px;

  &>.a-row {

    //background-color: red;padding: 4px 0 8px;text-align: center;}
    .program-item {
      background-color: #fff;
      width: 100%;
      height: 60px;
      text-align: center;
      border-radius: 8px;

      &:not(:last-child) {
        margin-bottom: 2px;
      }
    }
  }
}
</style>
