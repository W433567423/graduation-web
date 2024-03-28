import request from '@/services/require.ts';
import { type IResponseData } from './interfaces';
import { type IGetFileMenuRes, type IPostNewFileReq } from './interfaces/files';
const baseUrl = '/files';

// 获取 项目列表
export const getWorkFileMenu = async (parentId: number) => {
	return await request.get<IGetFileMenuRes[]>(baseUrl + `/menu/${parentId}`);
};

// 新建文件夹
export const postNewFolder = async (foldName: string, parentId: number) => {
	return await request.post<IResponseData<unknown>>(baseUrl + `/newFolder`, {
		data: { foldName, parentId },
		originData: true
	});
};
// 新建文件
export const postNewFile = async (data: IPostNewFileReq) => {
	return await request.post<IResponseData<unknown>>(baseUrl + `/newFile`, {
		data,
		originData: true
	});
};
