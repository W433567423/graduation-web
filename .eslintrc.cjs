module.exports = {
	parser: 'vue-eslint-parser', //vue解析器
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'standard-with-typescript',
		'plugin:vue/vue3-essential',
		'@vue/prettier',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: [
			'./tsconfig.json',
			'./tsconfig.node.json',
			'./commitlint.config.js',
			'./.prettierrc',
			'./uno.config.ts'
		],
		parser: '@typescript-eslint/parser',
		extraFileExtensions: ['.vue'] // 新增
	},
	root: true,
	plugins: ['vue'],
	rules: {
		// 关闭名称校验
		'vue/multi-word-component-names': 0,
		'no-useless-escape': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		// 关闭boolean校验
		'@typescript-eslint/strict-boolean-expressions': 0,
		// 关闭没有使用的变量校验
		'@typescript-eslint/no-unused-vars': 0,
		// 关闭不允许使用not null
		'@typescript-eslint/no-non-null-assertion': 0,
		// 关闭不允许使用不安全的参数
		'@typescript-eslint/no-unsafe-argument': 0,
		'@typescript-eslint/no-non-null-asserted-optional-chain': 0,
		// 关闭promise必须then catch
		'@typescript-eslint/no-floating-promises': 0,
		'@typescript-eslint/no-misused-promises': 0,
		// 允许any
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/prefer-nullish-coalescing': 0
	}
};
