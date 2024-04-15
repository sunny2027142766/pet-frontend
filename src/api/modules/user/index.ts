import { get } from '@/api'
import { UserListResult, UserParams } from './interface'

export const getUserList = (params: UserParams) => get<String, UserListResult>(`user/${params.pageSize}/${params.pageNo}`)
