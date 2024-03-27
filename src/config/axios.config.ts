import { type CreateAxiosDefaults } from 'axios';

const devBaseURL = 'http://localhost:8013';
const proBaseURL = 'https://ag.wtututu.top';
export const BASE_URL = import.meta.env.MODE === 'development' ? devBaseURL : proBaseURL;
// export const BASE_URL = proBaseURL;

export const TIMEOUT = 10 * 1000;

export const createAxiosConfig: CreateAxiosDefaults = {
	baseURL: BASE_URL, // 默认地址
	timeout: TIMEOUT, // 设置超时时间
	withCredentials: true, // 跨域时候允许携带凭证
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	}
};
