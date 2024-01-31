import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
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

const service: AxiosInstance = axios.create({
  method: 'get',
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: TIMEOUT,
  withCredentials: true
})
// 请求拦截

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    loading?: boolean
  }
}
const requestMap = new Map()
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
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
    if ((getLocalStorage('token') != null)) {
      config.headers.Authorization = useUserStore().token
    }
    return config
  },
  (error) => {
    console.log(error)
  }
)

service.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    const { data, config } = res

    const { loading = true } = config
    if (loading) {
      closeLoading()
    }
    // code处理
    (function () {
      switch (true) {
        case data.code >= 200 && data.code < 300:
          break
        case data.code === 401:
          // 登录状态已过期.处理路由重定向
          console.log('登录状态已过期')
          useUserStore().clearStorage()
          void router.replace({
            path: '/pc-login',
            query: { redirect: router.currentRoute.value.fullPath }
          })
          break
        default:
          ElMessage.error({
            message: typeof data.msg === 'string' ? data.msg : data.msg.join('且')
          })
          break
      }
    })()

    return data.data
  },
  async (error) => {
    closeLoading()
    let { message } = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({
      message,
      type: 'error'
    })
    return await Promise.reject(error)
  }
)
export default service
