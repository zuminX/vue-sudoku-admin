import {
  getRequest,
  postRequest
} from './basicApi'

/**
 * 数独API的基地址
 */
const base = '/game'

/**
 * 获取数独的所有难度等级
 */
export const getSudokuLevels = () => {
  return getRequest(`${base}/sudokuLevels`)
}

/**
 * 获取数独终盘
 */
export const getSudokuFinal = (sudokuLevel) => {
  return getRequest(`${base}/generateSudokuFinal`, { sudokuLevel })
}
