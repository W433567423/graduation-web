import request from '@/services/require.ts';
import type { IForgetLoginForm, IUser, IUserLoginForm } from './interfaces/users';

const baseUrl = '/users';
// 登录接口
export const postUserLogin = async (data: IUserLoginForm) => {
	return await request.post<{ token: string; user: IUser }>(baseUrl + `/login`, { data });
};

// 注册接口
export const postUserRegistry = async (data: IUserLoginForm) => {
	return await request.post<{ token: string; user: IUser }>(baseUrl + `/registry`, { data });
};

// 忘记密码接口
export const postUserForgetPassword = async (data: IForgetLoginForm) => {
	return await request.post(baseUrl + `/forgetPassword`, { data });
};

// 鉴权接口
export const test = async () => {
	return await request.get(baseUrl + `/auth`);
};
