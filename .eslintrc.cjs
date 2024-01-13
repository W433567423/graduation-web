module.exports = {
    "parser": "vue-eslint-parser",//vue解析器
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"],
        "parser": "@typescript-eslint/parser",
        "extraFileExtensions": [".vue"], // 新增
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // 关闭名称校验
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/explicit-function-return-type": "off"
    }
}
