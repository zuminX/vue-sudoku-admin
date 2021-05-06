import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 用户信息API的基地址
 */
const baseUrl = 'ums/info'

const infoAPI = {
  getBasicInfo: new APIInfo('basic', baseUrl)
}

/**
 * 获取用户的基本信息
 */
export const getBasicInfo = () => {
  return request(infoAPI.getBasicInfo)
}

