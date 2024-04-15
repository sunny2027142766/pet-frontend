import { ResPageType } from '@/api/interface'

export interface UserParams {
  pageNo?: number
  pageSize?: number
}
export interface User {}
export interface UserListResult extends ResPageType<User> {}
