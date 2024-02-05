import type { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
/** ************** axios ******************/
// 返回
interface IResponseData<T = any> {
  msg: string
  code: number
  data?: T
}

interface IAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
}
interface IRequestConfig extends AxiosRequestConfig {
  loading?: boolean
}
/** ************** end ******************/

export type {
  IAxiosRequestConfig,
  IResponseData,
  IRequestConfig
}
