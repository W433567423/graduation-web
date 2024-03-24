import { getLocalStorage, setLocalStorage } from '@/utils';
import { defineStore } from 'pinia';

// 第一个参数必须是全局唯一，可以是哟
export default defineStore('pinan', {
	state: () => ({
		pinanUser: {}
	}),
	actions: {
		// 初始化
		init() {
			this.pinanUser = getLocalStorage('pinanUser');
		},
		// 设置平安用户
		setPinanUser(user: any) {
			this.pinanUser = user;
			setLocalStorage('pinanUser', user);
		}
	}
});
