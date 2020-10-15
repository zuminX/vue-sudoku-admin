/**
 * axios请求封装
 */
import axios from 'axios'
import { showErrorToast } from '@/utils/publicUtils'
import { getData } from '@/utils/sessionStorageUtils'

// 设置POST请求的内容类型为JSON且编码格式为UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

/**
 * 使用axios中的拦截器对request进行请拦截
 */
axios.interceptors.request.use(config => {
  const token = getData('token')
  if (token) {
    config.headers['Authorization'] = `token:${token}`
  }
  return config
}, error => {
  showErrorToast({
    message: '请求失败'
  })
  console.log(error)
})

/**
 * 使用axios中的拦截器对response进行请拦截
 */
axios.interceptors.response.use(success => {
  const response = success.data
  const status = response.success
  // 请求失败
  if (!status) {
    // 显示错误信息
    showErrorToast({
      message: response.message
    })
  }
  return {
    success: status,
    data: response.data
  }
}, error => {
  let message
  console.log(error)
  // 根据请求响应的状态，显示不同的错误信息
  switch (error.response.status) {
    case 500:
    case 504:
      message = '服务器发生异常'
      break
    case 403:
      message = '权限不足'
      break
    case 401:
      message = '尚未登录，请先登录'
      break
    default :
      message = error.response.data.message || '未知错误'
      break
  }
  showErrorToast({
    message
  })
  return {
    success: false,
    data: null
  }
})

/**
 * 基地址
 */
const base = ''

/**
 * 发送POST请求
 * @param url 地址
 * @param params 参数
 */
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: JSON.stringify(params)
  })
}

/**
 * 发送PUT请求
 * @param url 地址
 * @param params 参数
 */
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 发送GET请求
 * @param url 地址
 * @param params 参数
 */
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}

/**
 * 发送DELETE请求
 * @param url 地址
 * @param params 参数
 */
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params
  })
}
