import axios, {
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig
} from 'axios'
import { type ResultData, type InternalAxiosRequestConfigAAA } from './index'

import { ElMessage, ElLoading } from 'element-plus'
import { getLocalStorage } from '@/utils'
import { BASE_URL, TIMEOUT } from '@/config/axios.config.ts'
import useUserStore from '@/stores/user.ts'
import router from '@/router'

const loadingInstance = ElLoading.service
let requestCount = 0
const showLoading = () => {
  requestCount++
  if (requestCount === 1) loadingInstance()
}
const closeLoading = () => {
  requestCount--
  if (requestCount === 0) loadingInstance().close()
}
// 请求响应参数，包含data

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor () {
    // 实例化axios
    this.service = axios.create({
      baseURL: BASE_URL, // 默认地址
      // 设置超时时间
      timeout: TIMEOUT,
      // 跨域时候允许携带凭证
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })

    /**
     * eslint-disable-next-line @typescript-eslint/ban-ts-comment
     * @ts-ignore
     * @ts-ignore
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    const requestMap = new Map()
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfigAAA) => {
        const controller = new AbortController()
        const key = config.data + config.url
        config.signal = controller.signal
        if (requestMap.has(key)) {
          requestMap.get(key).abort()
          requestMap.delete(key)
        } else {
          requestMap.set(key, controller)
        }
        const { loading = true } = config

        if (loading) showLoading()
        if (getLocalStorage('token') != null) {
          config.headers.Authorization = useUserStore().token
        }
        return config
      },
      (error) => {
        console.log(error)
      }
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (res: AxiosResponse<any, any>) => {
        const { data, config } = res

        const { loading = true } = config as any
        if (loading) {
          closeLoading()
        }
        // code处理
        this.handleCode(data.code as number, data.msg)

        return data.data
      },
      async (error) => {
        closeLoading()
        let { message }: { message: string } = error
        if (message === 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = `系统接口${message.slice(0, message.length - 3)}异常`
        }
        ElMessage({
          message,
          type: 'error'
        })
        return await Promise.reject(error)
      }
    )
  }

  handleCode (code: number, msg: any): void {
    switch (true) {
      case code >= 200 && code < 300:
        break
      case code === 401:
        // 登录状态已过期.处理路由重定向
        console.log('登录状态已过期')
        useUserStore().clearToken()
        void router.replace({
          path: '/pc-login',
          query: { redirect: router.currentRoute.value.fullPath }
        })
        break
      default:
        ElMessage.error({
          message: typeof msg === 'string' ? msg : msg.join('且')
        })
        break
    }
  }

  // 常用方法封装
  async get<T>(
    url: string,
    params?: AxiosRequestConfig
  ): Promise<ResultData<T>> {
    return await this.service.get(url, params)
  }

  async post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return await this.service.post(url, params)
  }

  async put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return await this.service.put(url, params)
  }

  async delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return await this.service.delete(url, params)
  }
}

// 导出一个实例对象
export default new RequestHttp()
