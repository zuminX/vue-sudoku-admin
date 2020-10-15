import {
  getRequest,
  postRequest
} from './basicApi'

/**
 * 安全相关API的基地址
 */
const base = '/security'

/**
 * 登录用户
 * @param loginForm 账号表单
 */
export const login = (loginForm) => {
  return postRequest(`${base}/login`, loginForm)
}

/**
 * 获取验证码
 */
export const captchaImage = () => {
  return getRequest(`${base}/captchaImage`)
}
