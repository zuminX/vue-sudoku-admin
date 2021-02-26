import {
  request
} from './index'
import { APIInfo } from '@/api/APIInfo'

/**
 * 用户API的基地址
 */
const baseUrl = 'user'

const userAPI = {
  getUserGameInformationById: new APIInfo('gameInformationById', baseUrl),
  getHistoryGameRecordById: new APIInfo('historyGameRecordById', baseUrl),
  getUserList: new APIInfo('userList', baseUrl),
  modifyUser: new APIInfo('modifyUser', baseUrl, 'post'),
  addUser: new APIInfo('addUser', baseUrl, 'post'),
  searchUser: new APIInfo('searchUser', baseUrl, 'post'),
  searchUserByName: new APIInfo('searchUserByName', baseUrl)
}

/**
 * 获取用户的游戏信息
 *
 * @param userId 用户ID
 */
export const getUserGameInformationById = (userId) => {
  return request(userAPI.getUserGameInformationById, { userId })
}

/**
 * 通过用户ID获取历史游戏记录
 *
 * @param userId 用户ID
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const getHistoryGameRecordById = (userId, page, pageSize) => {
  return request(userAPI.getHistoryGameRecordById, { userId, page, pageSize })
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
