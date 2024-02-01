import request from '@/services/require.ts'
import type { IUserLoginForm } from './index.d'

// 获取 验证码
export const getValidaCode = async (width = 108, height = 40) => {
  return await request.get('/captcha', {
    params: { width, height },
    loading: false
  })
}
// 获取 手机验证码
export const getPhoneValidaCode = async (phoneNum: string) => {
  return await request.get('/captcha/phone', {
    params: { phoneNum },
    loading: false
  })
}

// 登录接口
export const postUserLogin = async (data: IUserLoginForm) => {
  return await request.post('/users/login', {
    data
  })
}

// 注册接口
export const postUserRegistry = async (data: IUserLoginForm) => {
  return await request.post('/users/registry', {
    data
  })
}

// 鉴权接口
export const test = async () => {
  return await request.get('/users/auth')
}
