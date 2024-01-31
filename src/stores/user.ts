import { defineStore } from 'pinia'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { removeLocalStorage } from '@/utils/storage.util.ts'

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
      this.token = 'Bearer ' + token
      setLocalStorage('token', this.token)
    },

    // 设置token
    clearToken () {
      this.token = ''
      // 清除缓存
      removeLocalStorage('token')
    }
  }
})
