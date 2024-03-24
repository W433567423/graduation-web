import type {
	ICreateProjectReq,
	IGetProjectCodeRes,
	IProjectListRes,
	IRunProjectResultRes
} from '@/services/interfaces/projects';
import request from '@/services/require.ts';

const baseUrl = `/projects`;
// 获取 项目列表
export const getProjectList = async (page = 0, size = 15) => {
	return await request.get<IProjectListRes>(baseUrl + `/list`, {
		params: { page, size }
	});
};
// 创建 项目
export const postCreateProject = async (data: ICreateProjectReq) => {
	return await request.post<{ projectId: number; rootWorkFoldId?: number }>(baseUrl + `/create`, {
		data
	});
};

// 获取 项目代码
export const getProjectCode = async (projectId: number) => {
	return await request.get<IGetProjectCodeRes>(baseUrl + `/code${projectId}`);
};

// 修改 项目代码
export const patchProjectCode = async (projectId: number, code: string) => {
	return await request.patch<string>(baseUrl + `/code${projectId}`, {
		data: { code }
	});
};

// 运行 项目代码
export const postProjectCode = async (projectId: number, code: string, codeLanguage: string) => {
	return await request.post<IRunProjectResultRes>(baseUrl + `/code`, {
		params: { projectId },
		data: { code, codeLanguage }
	});
};

// 重命名 项目
export const putReNameProject = async (projectId: number, newName: string) => {
	return await request.patch(baseUrl + `/rename${projectId}`, {
		data: { newName }
	});
};

// 禁用 项目
export const disableProjectById = async (projectIds: number[], disable: boolean) => {
	return await request.patch(baseUrl + `/disable`, {
		data: { projectIds, disable }
	});
};
// 删除 项目
export const deleteProjectByIds = async (projectIds: number[]) => {
	return await request.delete(baseUrl + `/delete`, {
		data: { projectIds }
	});
};
