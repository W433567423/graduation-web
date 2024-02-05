import request from '@/services/require.ts'
import type { IProjectList } from '@/services/interfaces/projects'

const baseUrl = '/projects'
// 获取 项目列表
export const getProjectList = async (page = 0, size = 15) => {
  return await request.get<IProjectList>(baseUrl + '/list', {
    params: { page, size },
    loading: false
  })
}

// 重命名 项目
export const putReNameProject = async (projectId: number, newName: string) => {
  return await request.patch(baseUrl + '/rename', {
    data: { projectId, newName },
    loading: false
  })
}

// 删除 项目
export const deleteProjectById = async (projectId: number) => {
  return await request.delete(baseUrl + '/delete', {
    data: { projectId },
    loading: false
  })
}
