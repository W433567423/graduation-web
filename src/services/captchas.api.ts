import request from '@/services/require.ts';

const baseUrl = '/captcha';
// 获取 图形验证码
export const getValidCode = async (width = 81, height = 30) => {
	return await request.get(baseUrl + '', {
		params: { width, height }
	});
};
// 获取 邮箱验证码
export const getEmailValidCode = async (emailNum: string) => {
	return await request.get(baseUrl + '/email', {
		params: { emailNum }
	});
};
// 获取 手机验证码
export const getPhoneValidCode = async (phoneNum: string) => {
	return await request.get(baseUrl + '/phone', {
		params: { phoneNum }
	});
};
