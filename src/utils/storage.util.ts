// 获取本地缓存
export const getLocalStorage = (key: string) => {
	const temp = window.localStorage.getItem(key) ?? '';
	try {
		return JSON.parse(temp);
	} catch {
		return temp;
	}
};

// 设置本地缓存
export const setLocalStorage = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

// 清除本地缓存
export const removeLocalStorage = (key: string) => {
	window.localStorage.removeItem(key);
};

// 清除所有缓存
export const clearLocalStorage = () => {
	window.localStorage.clear();
};
