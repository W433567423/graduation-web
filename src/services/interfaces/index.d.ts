import { type AxiosRequestConfig } from 'axios';
/** ************** axios ******************/
// 返回
interface IResponseData<T = any> {
	msg: string;
	code: number;
	data?: T;
}
interface IResponseConfig extends InternalAxiosRequestConfig<any> {
	originData?: boolean;
}

interface IServerConfig {
	originData?: boolean;
}

interface IRequestConfig extends AxiosRequestConfig {
	originData?: boolean;
}
/** ************** end ******************/

export type { IRequestConfig, IResponseConfig, IResponseData, IServerConfig };
