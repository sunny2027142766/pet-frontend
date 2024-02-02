/*
 * @Author: 晴天
 * @Date: 2024-02-02 16:19:00
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 16:21:03
 * @FilePath: \pet-frontend\src\api\modules\demo\interface.ts
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import { ResCommonType } from '@/api/interface'

export interface DemoParams {
  id: string
}
export interface DemoData {
  name: string
}
export interface DemoResult extends ResCommonType<DemoData> {}

export interface ListData {
  id: number
  name: string
  age: number
}

export interface ListResult extends ResCommonType<ListData> {}
