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
  email: string
  phoneNum: string
  phoneValida: string
  valida: string
}
// 返回
interface IResData {
  message: string
  code: number
}
interface ResultData<T = any> extends IResData {
  data?: T
}

interface InternalAxiosRequestConfigAAA extends InternalAxiosRequestConfig {
  loading?: boolean
}
interface requestConfig extends AxiosRequestConfig {
  loading?: boolean
}
export type {
  IUserLoginForm,
  IForgetLoginForm,
  ResultData,
  InternalAxiosRequestConfigAAA,
  IResData, requestConfig
}
