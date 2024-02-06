import type { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
/** ************** users ******************/
interface IUserForm {
	username: string;
	valida: string;
}
interface IUserLoginForm extends IUserForm {
	password: string;
	emailValida: string;
	emailNum: string;
}
interface IForgetLoginForm {
	emailNum: string;
	emailValida: string;
	newPassword: string;
}
/** ************** end ******************/

export type { IUserLoginForm, IForgetLoginForm };
