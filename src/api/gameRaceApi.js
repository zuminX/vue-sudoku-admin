import {
  request
} from '@/api/index'
import { APIInfo } from '@/api/APIInfo'

/**
 * 数独游戏竞赛API的基地址
 */
const baseUrl = 'gameRace'

const gameRaceAPI = {
  publishRace: new APIInfo('publishPublicRace', baseUrl, 'post'),
  getPublicRaceList: new APIInfo('publicRaceList', baseUrl)
}

/**
 * 发布数独游戏竞赛
 * @param raceInformation 竞赛信息
 */
export const publishRace = (raceInformation) => {
  return request(gameRaceAPI.publishRace, raceInformation)
}

/**
 * 获取数独游戏竞赛列表
 */
export const getPublicRaceList = () => {
  return request(gameRaceAPI.getPublicRaceList)
}
