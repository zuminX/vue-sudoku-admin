import {
  getRequest
} from './basicApi'

/**
 * 统计信息API的基地址
 */
const base = '/statistics'

/**
 * 获取最近的用户统计数据
 * @param date 统计日期名
 */
export const getRecentStatisticsUserData = (date) => {
  return getRequest(`${base}/user/recentDate`, { date })
}

/**
 * 获取系统的用户总数
 */
export const getUserTotal = () => {
  return getRequest(`${base}/user/total`)
}

/**
 * 获取最近日期的游戏局数
 * @param date 统计日期名
 */
export const getRecentStatisticsGameTotal = (date) => {
  return getRequest(`${base}/game/recentTotal`, { date })
}

/**
 * 获取系统游戏总局数
 */
export const getGameTotal = () => {
  return getRequest(`${base}/game/total`)
}
