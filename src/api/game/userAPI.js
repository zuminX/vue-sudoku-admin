import {
  request
} from '@/api'
import { APIInfo } from '@/api/APIInfo'

/**
 * 用户游戏信息API的基地址
 */
const baseUrl = 'game/user'

const userAPI = {
  getUserGameInformationById: new APIInfo('gameInformationById', baseUrl),
  getHistoryGameRecordById: new APIInfo('historyGameRecordById', baseUrl)
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
