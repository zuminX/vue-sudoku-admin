import {
  request
} from '@/api'
import { APIInfo } from '@/api/APIInfo'

/**
 * 用户统计信息API的基地址
 */
const baseUrl = 'admin/statistics'

const statisticsAPI = {
  getRecentStatisticsUserData: new APIInfo('user/recentDate', baseUrl),
  getUserTotal: new APIInfo('user/total', baseUrl)
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
