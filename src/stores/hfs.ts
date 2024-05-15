import { getLocalStorage, setLocalStorage } from '@/utils/storage.util.ts';
import { defineStore } from 'pinia';

// 第一个参数必须是全局唯一，可以是哟
export default defineStore('hfs', {
	state: (): { isDetected: boolean } => ({
		isDetected: true
	}),
	actions: {
		// 初始化
		init() {
			if (getLocalStorage('isDetected')) {
				this.isDetected = false;
			}
			console.log('🚀 ~ init ~ this.isDetected:', this.isDetected);
		},

		// 设置Detect
		setDetect(v: boolean) {
			console.log('🚀 ~ setDetect ~ v:', v);
			this.isDetected = v;
			setLocalStorage('isDetected', this.isDetected);
		}
	}
});
