<!--
* DONE
* @description: ProgramItem 组件
* @author: tutu
* @time: 2024/1/13 17:37
-->
<template>
  <section class="program-list">
    <!--  head-->
    <el-row>
      <el-col :span="2">
        状态
      </el-col>
      <el-col :span="4">
        名称
      </el-col>
      <el-col :span="5">
        上次成功
      </el-col>
      <el-col :span="5">
        上次失败
      </el-col>
      <el-col :span="4">
        上次持续时间
      </el-col>
      <el-col :span="4">
        操作
      </el-col>
    </el-row>
    <!--  body-->
    <el-row v-for="(e) in list" :key="e.id" class="program-item">
      <el-col :span="2">

      </el-col>
      <el-col :span="4">
        {{ e.name }}
      </el-col>
      <el-col :span="5">
        {{ e.lastSuccessTime }}
      </el-col>
      <el-col :span="5">
        {{ e.lastFileTime }}
      </el-col>
      <el-col :span="4">
        {{ e.lastRunTime }}
      </el-col>
      <el-col :span="4">
        操作
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts" setup>
import { type IProgramItem } from '@pc/pages/type'

interface IProps {
  list: IProgramItem[]
}

const { list } = withDefaults(defineProps<IProps>(), {
  list () {
    return [{
      id: 0,
      name: 'string1',
      statusCode: 0,
      lastSuccessTime: 'string23',
      lastFileTime: 'string12',
      lastRunTime: 'string3453'
    }, {
      id: 0,
      name: 'string1',
      statusCode: 0,
      lastSuccessTime: 'string23',
      lastFileTime: 'string12',
      lastRunTime: 'string3453'
    }]
  }
}
)

</script>

<style lang="less" scoped>
.program-list {
  border-radius: 8px;
  background-color: #f4f4f8;
  padding: 4px;

  & > .el-row {
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
