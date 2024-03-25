/** ************** users ******************/
interface IUser {
	createTime: string;
	updateTime: string;
	id: number;
	username: string;
	password: string;
	phone: string | null | undefined;
	email: string;
	peace: string | null | undefined;
}
interface IUserForm {
	username: string;
	valid: string;
}
interface IUserLoginForm extends IUserForm {
	password: string;
	emailValid: string;
	emailNum: string;
}
interface IForgetLoginForm {
	emailNum: string;
	emailValid: string;
	newPassword: string;
}
/** ************** end ******************/

export type { IForgetLoginForm, IUser, IUserLoginForm };
