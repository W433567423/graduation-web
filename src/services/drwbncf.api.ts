import request from '@/services/require.ts';
import { type IResponseData } from './interfaces';

const baseUrl = `/drwbncf`;

// 运行 DRWBNCF项目
export const getRunDrwbncf = async () => {
	return await request.get<IResponseData<boolean>>(baseUrl + `/run`, { originData: true });
};

// 运行 DRWBNCF excel
export const getExcelDrwbncf = async () => {
	return await request.get<string[][]>(baseUrl + `/excel`);
};
