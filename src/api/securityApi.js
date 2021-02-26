import {
  request
} from './index'
import { APIInfo } from '@/api/APIInfo'

/**
 * 安全相关API的基地址
 */
const baseUrl = 'security'

const securityAPI = {
  login: new APIInfo('login', baseUrl, 'post'),
  captchaImage: new APIInfo('captchaImage', baseUrl)
}

/**
 * 登录用户
 * @param loginForm 账号表单
 */
export const login = (loginForm) => {
  return request(securityAPI.login, loginForm)
}

/**
 * 获取验证码
 */
export const captchaImage = () => {
  return request(securityAPI.captchaImage)
}
