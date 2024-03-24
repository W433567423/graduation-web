import request from '@/services/require.ts';

const baseUrl = '/pinan';
// 登录接口
export const getProducedYard = async () => {
	return await request.get(baseUrl + `/producedYard`);
};
