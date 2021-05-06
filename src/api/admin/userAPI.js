import {
  request
} from '@/api'
import { APIInfo } from '@/api/APIInfo'

/**
 * 用户管理API的基地址
 */
const baseUrl = 'admin/user'

const userAPI = {
  getUserList: new APIInfo('list', baseUrl),
  modifyUser: new APIInfo('modify', baseUrl, 'post'),
  addUser: new APIInfo('add', baseUrl, 'post'),
  searchUser: new APIInfo('search', baseUrl, 'post'),
  searchUserByName: new APIInfo('searchByName', baseUrl)
}

/**
 * 获取系统的用户
 *
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const getUserList = (page, pageSize) => {
  return request(userAPI.getUserList, { page, pageSize })
}

/**
 * 修改用户
 * @param modifyUserForm 修改用户表单
 */
export const modifyUser = (modifyUserForm) => {
  return request(userAPI.modifyUser, modifyUserForm)
}

/**
 * 新增用户
 * @param addUserForm 新增用户表单
 */
export const addUser = (addUserForm) => {
  return request(userAPI.addUser, addUserForm)
}

/**
 * 根据条件搜索用户
 *
 * @param searchUser 搜索用户的条件
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const searchUser = (searchUser, page, pageSize) => {
  searchUser.page = page
  searchUser.pageSize = pageSize
  return request(userAPI.searchUser, searchUser)
}

/**
 * 根据名称搜索用户
 *
 * @param name 名称
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const searchUserByName = (name, page, pageSize) => {
  return request(userAPI.searchUserByName, { name, page, pageSize })
}
