import { get } from '@/api'
import { DemoParams, DemoResult, ListResult } from './interface'

export const demo = (params: DemoParams) => get<DemoParams, DemoResult>('test/front', params)

export const getList = () => get<any, ListResult>('test')
