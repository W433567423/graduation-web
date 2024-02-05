<!--
* DONE
* @description: ProgramItem 组件
* @author: tutu
* @time: 2024/1/13 17:37
-->
<template>
  <section class="program-list">
    <!--  head-->
    <el-row align="middle">
      <el-col :span="2">状态</el-col>
      <el-col :span="4">名称</el-col>
      <el-col :span="5">创建时间</el-col>
      <el-col :span="5">上次运行时间</el-col>
      <el-col :span="3">上次运行状态</el-col>
      <el-col :span="5">操作</el-col>
    </el-row>
    <!--  body-->
    <el-row align="middle" v-for="e in list" :key="e.id" class="program-item">
      <el-col :span="2">
        <el-icon>
          <VideoPlay />
        </el-icon>
        <el-icon>
          <VideoPause />
        </el-icon>
      </el-col>
      <el-col :span="4">
        {{ e.projectName }}
      </el-col>
      <el-col :span="5">
        {{ dayjs(e.createTime).format("YYYY-MM-DD hh:mm:ss") }}
      </el-col>
      <el-col :span="5">
        {{ dayjs(e.updateTime).format("YYYY-MM-DD hh:mm:ss") }}
      </el-col>
      <el-col :span="3">
        {{ mapRunStatus(e.lastStatus) }}
      </el-col>
      <el-col :span="5" class="justify-content">
        <el-button :icon="Delete" circle />
        <el-dropdown>
          <el-button :icon="More" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="openRenameDialog(e.id)">
                <el-icon>
                  <EditPen />
                </el-icon>
                重命名
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon>
                  <EditPen />
                </el-icon>
                禁用
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </section>

  <el-dialog v-model="renameDialogFormVisible" title="重命名项目" width="500">

    <el-form-item label="新名称"> <el-input v-model="newName" maxlength="12" autocomplete="off" /></el-form-item>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="renameDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="renameProject">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import {
  Delete,
  EditPen,
  More,
  VideoPlay,
  VideoPause
} from '@element-plus/icons-vue'
import { mapRunStatus } from '@/utils/'

import { putReNameProject } from '@/services/projects.api'

import type { IProjectListItem } from '@/services/interfaces/projects'
import { ElMessage } from 'element-plus'

interface IProps {
  list: IProjectListItem[]
}

const emits = defineEmits(['update:list'])

const renameDialogFormVisible = ref(false) // 重命名对话框
const newName = ref('')
const localProjectId = ref(0)
const { list } = defineProps<IProps>()

const openRenameDialog = async (id: number) => {
  localProjectId.value = id
  renameDialogFormVisible.value = true
}
const renameProject = async () => {
  const res = await putReNameProject(localProjectId.value, newName.value)
  console.log(res)

  renameDialogFormVisible.value = false
  ElMessage.success({ message: '重命名成功' })
  emits('update:list')
}
</script>

<style lang="less" scoped>
.program-list {
  border-radius: 8px;
  background-color: #f4f4f8;
  padding: 4px;

  &>.el-row {
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
