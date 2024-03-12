import request from '@/services/require.ts';
const baseUrl = '/files';
// 获取 项目列表
export const getWorkFileMenu = async (parentId: number) => {
	return await request.get(baseUrl + '/menu', {
		params: { parentId }
	});
};

// 新建文件夹
export const postNewFolder = async (projectName: string, parentId: number) => {
	return await request.post(baseUrl + '/newFolder', {
		data: { projectName, parentId },
		originData: true
	});
};
