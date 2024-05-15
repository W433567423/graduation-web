import request from '@/services/require.ts';
import { type IResponseData } from './interfaces';

const baseUrl = `/hfs`;

// 上传文件接口
export const postHfsUpload = async () => {
	return await request.post<IResponseData<boolean>>(baseUrl + `/upload`, { originData: true });
};
