import request from '@/services/require.ts';

const baseUrl = '/captcha';
// 获取 图形验证码
export const getValidCode = async (width = 81, height = 30) => {
	return await request.get<string>(baseUrl, {
		params: { width, height }
	});
};
// 获取 邮箱验证码
export const getEmailValidCode = async (emailNum: string) => {
	await request.get<undefined>(baseUrl + `/email/${emailNum}`);
};
// TODO 未实现 获取 手机验证码
export const getPhoneValidCode = async (phoneNum: string) => {
	await request.get<undefined>(baseUrl + `/phone/${phoneNum}`);
};
