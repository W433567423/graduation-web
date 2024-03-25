import request from '@/services/require.ts';
import { type IResponseData } from './interfaces';
import { type IPeaceUser, type IYardListItem } from './interfaces/peace';

const baseUrl = '/peace';
// 登录接口
export const peaceLogin = async (data: { username: string; password: string; code: number }) => {
	return await request.post<{ peaceCookie: string; peaceUser: IPeaceUser }>(baseUrl + `/login`, {
		data,
		passLogin: true
	});
};

// 获取产码列表
export const getProducedYard = async () => {
	return await request.get<IResponseData<IYardListItem[] | undefined>>(
		baseUrl + `/producedYard?page=1&limit=20`,
		{
			passLogin: true,
			originData: true
		}
	);
};
