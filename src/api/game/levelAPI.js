import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 游戏难度API的基地址
 */
const baseUrl = 'game/level'

const levelAPI = {
  getSudokuLevels: new APIInfo('sudokuLevels', baseUrl)
}

/**
 * 获取数独的所有难度等级
 */
export const getSudokuLevels = () => {
  return request(levelAPI.getSudokuLevels)
}
