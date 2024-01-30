import request from '@/services/require.ts'
import type { IUserLogin } from './index.d'

// 获取 验证码
export const getValidaCode = async (width = 92, height = 40) => {
  return await request({
    url: '/captcha',
    method: 'get',
    params: { width, height }
  })
}

export const postUserLogin = async (data: IUserLogin) => {
  return await request({
    url: '/users/login',
    method: 'post',
    data
  })
}
