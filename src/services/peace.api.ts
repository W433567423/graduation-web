import request from '@/services/require.ts';

const baseUrl = '/peace';
// 登录接口
export const peaceLogin = async (data: { username: string; password: string; code: number }) => {
	return await request.post(baseUrl + `/login`, { data, passLogin: true });
};

// 获取产码列表
export const getProducedYard = async () => {
	return await request.get(baseUrl + `/producedYard?page=1&limit=20`, { passLogin: true });
};
