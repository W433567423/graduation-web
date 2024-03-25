import { type IUser } from '@/services/interfaces/users';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { removeLocalStorage } from '@/utils/storage.util.ts';
import { defineStore } from 'pinia';

// 第一个参数必须是全局唯一，可以是哟
export default defineStore('user', {
	state: (): { token: string; user: IUser } => ({
		token: '',
		user: {
			createTime: '',
			updateTime: '',
			id: 0,
			username: '',
			password: '',
			phone: '',
			email: '',
			peace: ''
		}
	}),
	actions: {
		// 初始化
		init() {
			this.token = getLocalStorage('token');
			this.user = getLocalStorage('user');
		},

		// 设置token
		setToken(token: string) {
			this.token = 'Bearer ' + token;
			setLocalStorage('token', this.token);
		},
		// 设置用户信息
		setUser(user: IUser) {
			this.user = user;
			setLocalStorage('user', this.user);
		},

		// 设置token
		clearToken() {
			this.token = '';
			// 清除缓存
			removeLocalStorage('token');
		}
	}
});
