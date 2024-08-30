const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = [{
  env: {
    es2020: true,
    node: true,
    browser: true,
    webextensions: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'prefer-rest-params': 'off',
    'no-console': 0,
    'no-debugger': 0,
    quotes: [1, 'single'], //引号类型 `` "" ''
    semi: [2, 'never'], // 语句强制分号结尾
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: false,
      },
    ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
}, eslintPluginPrettierRecommended]
