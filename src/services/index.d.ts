interface IUserForm {
  username: string;
  valida: string;
}
interface IUserLoginForm extends IUserForm {
  password: string;
  phoneValida: string;
  phoneNum: string;
}
interface IForgetLoginForm extends IUserForm {
  phoneNum: string;
}
export type { IUserLoginForm, IForgetLoginForm };
