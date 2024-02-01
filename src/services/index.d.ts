import type { InternalAxiosRequestConfig } from 'axios'
interface IUserForm {
  username: string
  valida: string
}
interface IUserLoginForm extends IUserForm {
  password: string
  phoneValida: string
  phoneNum: string
}
interface IForgetLoginForm extends IUserForm {
  phoneNum: string
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
export type {
  IUserLoginForm,
  IForgetLoginForm,
  ResultData,
  InternalAxiosRequestConfigAAA,
  IResData
}
