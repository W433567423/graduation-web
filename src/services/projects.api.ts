import type { IProjectList } from '@/services/interfaces/projects';
import request from '@/services/require.ts';

const baseUrl = '/projects';
// 获取 项目列表
export const getProjectList = async (page = 0, size = 15) => {
	return await request.get<IProjectList>(baseUrl + '/list', {
		params: { page, size }
	});
};
// 获取 项目代码
export const getProjectCode = async (projectId: number) => {
	return await request.get<IProjectList>(baseUrl + '/code', {
		params: { projectId }
	});
};

// 重命名 项目
export const putReNameProject = async (projectId: number, newName: string) => {
	return await request.patch(baseUrl + '/rename', {
		data: { projectId, newName }
	});
};

// 禁用 项目
export const disableProjectById = async (projectIds: number[], disable: boolean) => {
	return await request.patch(baseUrl + '/disable', {
		data: { projectIds, disable }
	});
};
// 删除 项目
export const deleteProjectByIds = async (projectIds: number[]) => {
	return await request.delete(baseUrl + '/delete', {
		data: { projectIds }
	});
};
