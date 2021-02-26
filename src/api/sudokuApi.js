import {
  request
} from './index'
import { APIInfo } from '@/api/APIInfo'

/**
 * 数独API的基地址
 */
const baseUrl = 'sudoku'

const sudokuAPI = {
  getSudokuLevels: new APIInfo('sudokuLevels', baseUrl),
  getSudokuFinal: new APIInfo('generateSudokuFinal', baseUrl)
}

/**
 * 获取数独的所有难度等级
 */
export const getSudokuLevels = () => {
  return request(sudokuAPI.getSudokuLevels)
}

/**
 * 获取数独终盘
 */
export const getSudokuFinal = (sudokuLevel) => {
  return request(sudokuAPI.getSudokuFinal, { sudokuLevel })
}
