import request from '@/services/require.ts'

const baseUrl = '/captcha'
// 获取 图形验证码
export const getValidaCode = async (width = 81, height = 30) => {
  return await request.get(baseUrl + '', {
    params: { width, height },
    loading: false
  })
}
// 获取 邮箱验证码
export const getEmailValidaCode = async (emailNum: string) => {
  return await request.get(baseUrl + '/email', {
    params: { emailNum },
    loading: false
  })
}
// 获取 手机验证码
export const getPhoneValidaCode = async (phoneNum: string) => {
  return await request.get(baseUrl + '/phone', {
    params: { phoneNum },
    loading: false
  })
}
