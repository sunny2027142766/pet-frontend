/*
 * @Author: 晴天
 * @Date: 2024-02-02 14:20:06
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:24:17
 * @FilePath: \pet-frontend\src\api\error.ts
 * @Description: 
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved. 
 */
export class CustomError extends Error {
    public code: number
  
    public msg: string
  
    public data: any
  
    public message: string
  
    
    constructor(code: number, msg: string, data: any) {
      super()
      this.code = code
      this.msg = msg
      this.data = data || null
      this.message = `${this.code} - ${this.msg}`
    }
  }
  