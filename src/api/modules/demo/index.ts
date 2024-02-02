/*
 * @Author: 晴天
 * @Date: 2024-02-02 15:49:22
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 16:42:48
 * @FilePath: \pet-frontend\src\api\modules\demo\index.ts
 * @Description: 测试相关接口
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import { get } from '@/api'
import { DemoParams, DemoResult, ListResult } from './interface'

export const demo = (params: DemoParams) => get<DemoParams, DemoResult>('test/front', params)

export const getList = () => get<any, ListResult>('test')
