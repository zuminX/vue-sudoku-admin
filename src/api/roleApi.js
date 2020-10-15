import { getRequest } from '@/api/basicApi'

/**
 * 角色API的基地址
 */
const base = '/role'

/**
 * 获取系统角色名列表
 */
export const getRoleList = () => {
  return getRequest(`${base}/roleList`)
}
