import {
  getTwoDimeBoolArray,
  getTwoDimeNumArray
} from '@/utils/publicUtils'

/**
 * 将字符串转化为数独矩阵
 * @param matrix 数独矩阵的字符串形式
 */
export const convertToSudokuMatrix = (matrix) => {
  const result = getTwoDimeNumArray()
  for (let i = 0, num = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      result[i][j] = matrix.charAt(num++)
    }
  }
  return result
}
/**
 * 将字符串转化为题目空缺数组
 * @param holes 题目空缺数组的字符串形式
 */
export const convertToSudokuHoles = (holes) => {
  const result = getTwoDimeBoolArray()
  for (let i = 0, num = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      result[i][j] = +(holes.charAt(num++)) === 1
    }
  }
  return result
}
