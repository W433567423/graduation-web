import request from '@/services/require.ts';
import { type IResponseData } from './interfaces';

const baseUrl = `/drwbncf`;

// 运行 DRWBNCF项目
export const getRunDrwbncf = async () => {
	return await request.get<IResponseData<boolean>>(baseUrl + `/run`, { originData: true });
};
