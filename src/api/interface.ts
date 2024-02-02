/**
 * 后台接口公共的返回格式
 * 具体根据实际跟后台约定的定义
 */
export interface ResCommonType<T> {
  code: number
  msg: string
  data: T
}
