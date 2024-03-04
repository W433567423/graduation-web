/** ************** users ******************/
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

export type { IForgetLoginForm, IUserLoginForm };
