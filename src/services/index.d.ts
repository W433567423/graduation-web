import type { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
interface IUserForm {
  username: string
  valida: string
}
interface IUserLoginForm extends IUserForm {
  password: string
  emailValida: string
  emailNum: string
}
interface IForgetLoginForm {
  emailNum: string
  emailValida: string
  newPassword: string
}
// 返回
interface IResponseData<T = any> {
  msg: string
  code: number
  data?: T
}
interface ResultData<T = any> extends IResData {
  data?: T
}

interface IAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
}
interface IRequestConfig extends AxiosRequestConfig {
  loading?: boolean
}
export type {
  IUserLoginForm,
  IForgetLoginForm,
  ResultData,
  IAxiosRequestConfig,
  IResponseData,
  IRequestConfig
}
