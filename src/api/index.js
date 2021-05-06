/**
 * axios请求封装
 */
import axios from 'axios'
import router from '../router'
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
    config.headers['Authorization'] = `bearer ${token}`
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
      router.replace('/login')
      break
    case 401:
      message = '尚未登录，请先登录'
      router.replace('/login')
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
 * 发送请求
 * @param apiInfo API信息
 * @param params 参数
 */
export const request = (apiInfo, params) => {
  return requestMap[apiInfo.type](apiInfo.path, params)
}

const requestMap = {
  'post': postRequest,
  'get': getRequest,
  'put': putRequest,
  'delete': deleteRequest
}

/**
 * 发送POST请求
 * @param path 地址
 * @param params 参数
 */
function postRequest(path, params) {
  return axios({
    method: 'post',
    url: `${base}${path}`,
    data: JSON.stringify(params)
  })
}

/**
 * 发送GET请求
 * @param path 地址
 * @param params 参数
 */
function getRequest(path, params) {
  return axios({
    method: 'get',
    url: `${base}${path}`,
    params
  })
}

/**
 * 发送PUT请求
 * @param path 地址
 * @param params 参数
 */
function putRequest(path, params) {
  return axios({
    method: 'put',
    url: `${base}${path}`,
    data: JSON.stringify(params)
  })
}

/**
 * 发送DELETE请求
 * @param path 地址
 * @param params 参数
 */
function deleteRequest(path, params) {
  return axios({
    method: 'delete',
    url: `${base}${path}`,
    params
  })
}
