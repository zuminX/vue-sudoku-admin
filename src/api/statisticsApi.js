import {
  request
} from './index'
import { APIInfo } from '@/api/APIInfo'

/**
 * 统计信息API的基地址
 */
const baseUrl = 'statistics'

const statisticsAPI = {
  getRecentStatisticsUserData: new APIInfo('user/recentDate', baseUrl),
  getUserTotal: new APIInfo('user/total', baseUrl),
  getRecentStatisticsGameTotal: new APIInfo('game/recentTotal', baseUrl),
  getGameTotal: new APIInfo('game/total', baseUrl)
}

/**
 * 获取最近的用户统计数据
 * @param date 统计日期名
 */
export const getRecentStatisticsUserData = (date) => {
  return request(statisticsAPI.getRecentStatisticsUserData, { date })
}

/**
 * 获取系统的用户总数
 */
export const getUserTotal = () => {
  return request(statisticsAPI.getUserTotal)
}

/**
 * 获取最近日期的游戏局数
 * @param date 统计日期名
 */
export const getRecentStatisticsGameTotal = (date) => {
  return request(statisticsAPI.getRecentStatisticsGameTotal, { date })
}

/**
 * 获取系统游戏总局数
 */
export const getGameTotal = () => {
  return request(statisticsAPI.getGameTotal)
}
