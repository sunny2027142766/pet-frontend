/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:22:12
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:27:29
 * @FilePath: \pet-frontend\.eslintrc.cjs
 * @Description: 
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved. 
 */


module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-explicit-any': ['off']
    }
};