/*
 * @Author: 晴天
 * @Date: 2024-02-02 14:08:22
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:24:30
 * @FilePath: \pet-frontend\src\api\index.ts
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import axios, { type AxiosRequestConfig } from 'axios'
import { resetInterfacePath } from '@/utils'
// 错误码统一处理
import ERRORCODES from '@/enums/error-code'
// 定义错误码类型
import type { NUMBER_STRING as ERROR_CODES_TYPES } from '@/interface'

import { CustomError } from './error'

// 定义错误码
const ERROR_CODES = ERRORCODES as ERROR_CODES_TYPES
// 设置默认请求失效时间30s
export const AXIOS_TIMEOUT_LIMIT = 30000
axios.defaults.timeout = AXIOS_TIMEOUT_LIMIT

// 请求拦截
axios.interceptors.request.use(
  config => {
    config.url = resetInterfacePath(config.url || '')
    if (config.url !== '/login') {
      // config.headers['Authorization'] = `Bearer ${getToken()}` // 携带token
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    const data = response.data
    const resCode: keyof ERROR_CODES_TYPES = data.code
    if (ERROR_CODES[resCode]) {
      return Promise.reject(data)
    }
    return Promise.resolve(data)
  },
  err => {
    let errCode: keyof ERROR_CODES_TYPES = 500
    let errMsg = err?.message || '连接到服务器失败'
    if (err?.response) {
      const { code, status } = err.response
      errCode = code || status || 500
      errMsg = ERROR_CODES[errCode]
    }
    console.error('ERROR_CODES[]', errCode, ERROR_CODES[errCode])
    // 错误处理
    return Promise.reject(new CustomError(errCode, errMsg, err))
  }
)

/**
 * 发起GET请求
 * 泛型 U 定义请求数据类型
 * 泛型 T 定义返回数据 data 项类型,
 * t:加上时间戳，防止缓存get请求
 * @param {string} url 请求链接
 * @param {object} params 请求参数
 * @param {object} config 配置
 */
export const get = <U = unknown, T = unknown>(url: string, params?: U, config?: AxiosRequestConfig) =>
  axios.get<T, T>(url, {
    params: {
      ...params,
      // t: Date.now()
    },
    ...config
  })

/**
 * 发起POST请求
 * 泛型 U 定义请求数据类型
 * 泛型 T 定义返回数据 data 项类型
 * @param {string} url 请求链接
 * @param {object} params 请求参数
 * @param {object} config 配置
 */
export const post = <U = unknown, T = unknown>(url: string, params?: U, config: AxiosRequestConfig = {}) => {
  if (Array.isArray(params)) {
    return axios.post<T, T>(url, [...params], config)
  }
  return axios.post<T, T>(url, { ...params }, config)
}

/**
 * 发起 DELETE 请求
 * 泛型 T 定义返回数据 data 项类型
 * @param {string} url 请求链接
 * @param {object} config 配置
 */
export const del = <T = unknown>(url: string, config: AxiosRequestConfig = {}) => axios.delete<T>(url, config)

export default {
  get,
  post,
  del
}
