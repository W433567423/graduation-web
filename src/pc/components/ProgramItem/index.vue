<!--
* DONE
* @description: ProgramItem 组件
* @author: tutu
* @time: 2024/1/13 17:37
-->
<template>
  <a-table :data="list" style="width: 100%" stripe height="100%">
    <a-table-column prop="date" label="状态" width=80 />
    <a-table-column prop="projectName" sortable label="名称" width=210 />
    <a-table-column prop="createTime" sortable label="创建时间" width=210 />
    <a-table-column prop="updateTime" sortable label="上次运行时间" width=210 />
    <a-table-column prop="lastStatus" label="上次运行状态" :filters="[
      { text: '未运行', value: '0' }, { text: '运行失败', value: '-1' }, { text: '运行成功', value: '1' },]"
      :filter-method="filterRunStatusHandler" align="center" width="180">
      <template #default="scope">
        {{ mapRunStatus(scope.row.lastStatus) }}
      </template>
    </a-table-column>
    <a-table-column prop="action" label="操作" fixed="right">
      <template #default="scope">
        <a-dropdown>
          <a-button circle ><template #icon>
        <icon-more />
      </template></a-button>
              <a-doption @click="openRenameDialog(scope.row.id)">
                <a-icon>
                  <EditPen />
                </a-icon>
                重命名
              </a-doption>

              <a-doption @click="openDeleteDialog(scope.row.id)">
                <a-icon>
                  <Delete />
                </a-icon>
                删除项目
              </a-doption>

              <a-doption>
                <a-icon>
                  <EditPen />
                </a-icon>
                禁用
              </a-doption>
        </a-dropdown>
      </template>
    </a-table-column>
  </a-table>

  <a-modal v-model="renameDialogFormVisible" title="重命名项目" width="500">

    <a-form-item label="新名称"> <a-input v-model="newName" maxlength="12" autocomplete="off" /></a-form-item>
    <template #footer>
      <a-button @click="renameDialogFormVisible = false">取消</a-button>
      <a-button type="primary" @click="renameProject">
        确认修改
      </a-button>
    </template>
  </a-modal>
  <a-modal v-model="deleteDialogFormVisible" title="删除项目" width="500">
    是否要删除该项目，此操作一旦成功将无法撤回
    <template #footer>
      <a-button @click="deleteDialogFormVisible = false">取消</a-button>
      <a-button type="primary" @click="deleteProject">
        确认修改
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { mapRunStatus } from '@/utils/'
import { ref } from 'vue'

import { deleteProjectById, putReNameProject } from '@/services/projects.api'

import type { IProjectListItem } from '@/services/interfaces/projects'
import { Notification } from '@arco-design/web-vue'

interface IProps {
  list: IProjectListItem[]
}

const emits = defineEmits(['update:list'])

const renameDialogFormVisible = ref(false) // 重命名对话框
const deleteDialogFormVisible = ref(false) // 重命名对话框
const newName = ref('') // 项目的新名字
const localProjectId = ref(0) // 当前操作的项目id
const { list } = defineProps<IProps>()

// 运行状态筛选
const filterRunStatusHandler = (value: string,
  row: IProjectListItem) => {
  console.log(String(row.lastStatus) === value)

  return String(row.lastStatus) === value
}

// 打开重命名对话框
const openRenameDialog = (id: number) => {
  localProjectId.value = id
  renameDialogFormVisible.value = true
}

// 打开删除对话框
const openDeleteDialog = (id: number) => {
  localProjectId.value = id
  deleteDialogFormVisible.value = true
}

// 重命名项目功能
const renameProject = async () => {
  await putReNameProject(localProjectId.value, newName.value)
  renameDialogFormVisible.value = false
  Notification.success({ content: '重命名成功' })
  emits('update:list')
}
// 删除项目
const deleteProject = async () => {
  await deleteProjectById(localProjectId.value)
  deleteDialogFormVisible.value = false
  Notification.success({ content: '删除项目成功' })
  emits('update:list')
}
</script>

<style lang="less" scoped>
.program-list {
  border-radius: 8px;
  background-color: #f4f4f8;
  padding: 4px;

  &>.a-row {
    //background-color: red;
    padding: 4px 0 8px;
    text-align: center;
  }

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
</style>
