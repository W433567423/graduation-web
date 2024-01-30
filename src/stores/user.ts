import { defineStore } from 'pinia'
import { getLocalStorage, setLocalStorage } from '@/utils'

// 第一个参数必须是全局唯一，可以是哟
export default defineStore('user', {
  state: () => ({
    token: ''

  }),
  actions: {
    // 初始化
    init () {
      this.token = getLocalStorage('token')
    },
    // 设置token
    setToken (token: string) {
      console.log('设置token', token)
      this.token = 'Bearer ' + token
      setLocalStorage('token', token)
    }
  }
})
