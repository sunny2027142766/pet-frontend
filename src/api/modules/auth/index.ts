import { get } from '@/api'
import { CodeResult } from './interface'

export const sendCode = (email: string) => get<String, CodeResult>(`auth/sendCode/${email}`)
