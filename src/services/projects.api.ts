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
