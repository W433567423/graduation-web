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
      console.log('初始化读取token', this.token)
    },
    // 设置token
    setToken (token: string) {
      this.token = 'Bearer ' + token
      console.log('设置token', this.token)
      setLocalStorage('token', this.token)
    }
  }
})
