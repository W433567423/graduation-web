import { getLocalStorage, setLocalStorage } from '@/utils';
import { defineStore } from 'pinia';

// 第一个参数必须是全局唯一，可以是哟
export default defineStore('peace', {
	state: () => ({
		peaceUser: {}
	}),
	actions: {
		// 初始化
		init() {
			this.peaceUser = getLocalStorage('peaceUser');
		},
		// 设置平安用户
		setPeaceUser(user: any) {
			this.peaceUser = user;
			setLocalStorage('peaceUser', user);
		}
	}
});
