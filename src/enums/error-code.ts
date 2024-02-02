/*
 * @Author: 晴天
 * @Date: 2024-02-02 14:11:11
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:25:18
 * @FilePath: \pet-frontend\src\enums\error-code.ts
 * @Description: 
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved. 
 */

const ERROR_CODE = {
    400: '错误请求，状态码:400',
    401: '未授权，请重新登录，状态码:401',
    403: '拒绝访问，状态码:403',
    404: '请求错误,未找到该资源，状态码:404',
    405: '请求方法未允许，状态码:405',
    408: '请求超时，状态码:408',
    500: '服务器端出错，状态码:500',
    501: '网络未实现，状态码:501',
    502: '网关错误，状态码:502',
    503: '服务不可用，状态码:503',
    504: '网络超时，状态码:504',
    505: 'HTTP版本不支持该请求，状态码:505'
  }
  
  export default ERROR_CODE
  