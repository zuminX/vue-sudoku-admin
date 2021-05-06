import {
  request
} from '@/api'
import { APIInfo } from '@/api/APIInfo'

/**
 * 统计信息API的基地址
 */
const baseUrl = 'game/statistics'

const statisticsAPI = {
  getRecentStatisticsGameTotal: new APIInfo('recentTotal', baseUrl),
  getGameTotal: new APIInfo('total', baseUrl)
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
