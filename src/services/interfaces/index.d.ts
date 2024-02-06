/** ************** axios ******************/
// 返回
interface IResponseData<T = any> {
  msg: string
  code: number
  data?: T
}

/** ************** end ******************/

export type {
  IResponseData
}
