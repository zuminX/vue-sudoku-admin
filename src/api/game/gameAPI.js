import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 数独游戏API的基地址
 */
const baseUrl = 'game/game'

const gameAPI = {
  getSudokuFinal: new APIInfo('generateSudokuFinal', baseUrl)
}

/**
 * 获取数独终盘
 */
export const getSudokuFinal = (sudokuLevel) => {
  return request(gameAPI.getSudokuFinal, { sudokuLevel })
}
