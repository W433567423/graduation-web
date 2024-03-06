module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 关闭校验subject仅小写
		'subject-case': [0]
	}
};
