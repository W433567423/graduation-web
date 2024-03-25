import request from '@/services/require.ts';
import { type IResponseData } from './interfaces';
import {
	type IPayMessageItem,
	type IPeaceChannelItem,
	type IPeaceMenuItem,
	type IPeaceUser,
	type IYardItem
} from './interfaces/peace';

const baseUrl = '/peace';
// Get接口
export const peaceGet = async <Res>(url: string) => {
	return await request.get<Res>(baseUrl + `/get?url=${url}`, {
		passLogin: true
	});
};
// Post接口
export const peacePost = async <T = any, Res = any>(url: string, data?: T) => {
	return await request.post<Res>(baseUrl + `/post`, {
		data: { url, data },
		passLogin: true
	});
};
// 登录接口
export const peaceLogin = async (data: { username: string; password: string; code: number }) => {
	return await request.post<{ peaceCookie: string; peaceUser: IPeaceUser }>(baseUrl + `/login`, {
		data,
		passLogin: true
	});
};

// 获取菜单
export const getMenu = async () => {
	return await request.post<IPeaceMenuItem[]>(baseUrl + `/getMenu`, {
		passLogin: true
	});
};
// 获取产码列表
export const getProducedYard = async () => {
	return await request.get<IResponseData<IYardItem[] | undefined>>(
		baseUrl + `/producedYard?page=1&limit=20`,
		{
			passLogin: true,
			originData: true
		}
	);
};
// 获取充值信息列表
export const getPayMessage = async () => {
	return await request.get<IResponseData<IPayMessageItem[] | undefined>>(
		baseUrl + `/payMessage?page=1&limit=20`,
		{
			passLogin: true,
			originData: true
		}
	);
};
// 获取通道列表
export const getChannelList = async () => {
	return await request.get<IResponseData<IPeaceChannelItem[] | undefined>>(
		baseUrl + `/channelList?page=1&limit=20`,
		{
			passLogin: true,
			originData: true
		}
	);
};
