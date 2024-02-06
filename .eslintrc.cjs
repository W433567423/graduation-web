module.exports = {
  parser: "vue-eslint-parser", //vue解析器
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:vue/vue3-essential"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./commitlint.config.js", "./.prettierrc.cjs"],
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".vue"], // 新增
  },
  plugins: ["vue"],
  rules: {
    // 关闭名称校验
    "vue/multi-word-component-names": 0,
    "no-useless-escape": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    //     关闭boolean校验
    "@typescript-eslint/strict-boolean-expressions": 0,
    //     关闭没有使用的变量校验
    "@typescript-eslint/no-unused-vars": 0,

    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unsafe-argument": 0,
  },
};
