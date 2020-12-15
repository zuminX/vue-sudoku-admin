import {
  getRequest,
  postRequest
} from '@/api/basicApi'

/**
 * 数独游戏竞赛API的基地址
 */
const base = '/gameRace'

/**
 * 发布数独游戏竞赛
 * @param raceInformation 竞赛信息
 */
export const publishRace = (raceInformation) => {
  return postRequest(`${base}/publishPublicRace`, raceInformation)
}

/**
 * 获取数独游戏竞赛列表
 */
export const getRaceList = () => {
  return getRequest(`${base}/publicRaceList`)
}
