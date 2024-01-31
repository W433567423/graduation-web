import request from '@/services/require.ts'
import type { IUserLogin } from './index.d'

// 获取 验证码
export const getValidaCode = async (width = 108, height = 40) => {
  return await request({
    url: '/captcha',
    method: 'get',
    params: { width, height }
  })
}

// 登录接口
export const postUserLogin = async (data: IUserLogin) => {
  return await request({
    url: '/users/login',
    method: 'post',
    data
  })
}

// 注册接口
export const postUserRegistry = async (data: IUserLogin) => {
  return await request({
    url: '/users/registry',
    method: 'post',
    data
  })
}

// 鉴权接口
export const test = async () => {
  return await request({
    url: '/users/auth',
    method: 'get'
  })
}
