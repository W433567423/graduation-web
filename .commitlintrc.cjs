module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 关闭校验subject仅小写
		'body-case': [0]
	}
};
