import request from '@/services/require.ts';

const baseUrl = '/pinan';
// 登录接口
export const pinanLogin = async (data: { username: string; password: string; code: number }) => {
	return await request.post(baseUrl + `/login`, { data, passLogin: true });
};

// 获取产码列表
export const getProducedYard = async () => {
	return await request.get(baseUrl + `/producedYard?page=1&limit=20`, { passLogin: true });
};
