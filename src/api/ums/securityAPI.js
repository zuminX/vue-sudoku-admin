import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 用户安全API的基地址
 */
const baseUrl = 'ums/security'

const securityAPI = {
  login: new APIInfo('login', baseUrl, 'post'),
  logout: new APIInfo('logout', baseUrl, 'post')
}

/**
 * 登录用户
 * @param loginForm 账号表单
 */
export const login = (loginForm) => {
  return request(securityAPI.login, loginForm)
}

/**
 * 退出登录
 */
export const logout = () => {
  return request(securityAPI.logout)
}
