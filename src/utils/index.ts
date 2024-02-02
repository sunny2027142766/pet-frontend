/*
 * @Author: 晴天
 * @Date: 2024-02-02 14:11:55
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:30:53
 * @FilePath: \pet-frontend\src\utils\index.ts
 * @Description: 
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved. 
 */

export const resetInterfacePath = (url: string) => `/api/${url}`
// return url

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)