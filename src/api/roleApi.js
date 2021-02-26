import {
  request
} from '@/api/index'
import { APIInfo } from '@/api/APIInfo'

/**
 * 角色API的基地址
 */
const baseUrl = 'role'

const roleAPI = {
  getRoleList: new APIInfo('roleList', baseUrl)
}

/**
 * 获取系统角色名列表
 */
export const getRoleList = () => {
  return request(roleAPI.getRoleList)
}
