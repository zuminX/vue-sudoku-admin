import {
  getTwoDimeBoolArray,
  getTwoDimeNumArray
} from '@/utils/publicUtils'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'

/**
 * 判断指定位置是否为空缺格子
 *
 * @param holes 题目空缺数组
 * @param i 行
 * @param j 列
 * @returns {boolean} 是空缺格子返回true，否则返回false
 */
export const isHole = (holes, i, j) => {
  return holes[i][j]
}

/**
 * 判断指定位置是否不为空缺格子
 *
 * @param holes 题目空缺数组
 * @param i 行
 * @param j 列
 * @returns {boolean} 不是空缺格子返回true，否则返回false
 */
export const isNotHole = (holes, i, j) => {
  return !isHole(holes, i, j)
}

/**
 * 判断用户在指定位置是否填写了数字
 *
 * @param sudokuData 数独数据
 * @param i 行
 * @param j 列
 * @returns {boolean} 填写了返回true，否则返回false
 */
export const hasInput = (sudokuData, i, j) => {
  return sudokuData[i][j] !== '' && sudokuData[i][j] != null
}

/**
 * 获取数独数字数组
 *
 * @returns {number[][]} 数独数组
 */
export const getSudokuArray = () => {
  return [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
}

/**
 * 将字符串转化为数独矩阵
 *
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
 *
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

/**
 * 设置数独指定行的数据
 *
 * @param sudokuData 数独数据
 * @param row 行
 * @param data 数据
 */
export const setSudokuRow = (sudokuData, row, data) => {
  for (let col = 0; col < 9; col++) {
    sudokuData[row][col] = data
  }
}

/**
 * 设置数独指定列的数据
 *
 * @param sudokuData 数独数据
 * @param column 列
 * @param data 数据
 */
export const setSudokuColumn = (sudokuData, column, data) => {
  for (let row = 0; row < 9; row++) {
    sudokuData[row][column] = data
  }
}

/**
 * 设置数独指定宫的数据
 *
 * @param sudokuData 数独数据
 * @param row 行
 * @param column 列
 * @param data 数据
 */
export const setSudokuPalace = (sudokuData, row, column, data) => {
  const firstRow = Math.floor(row / 3) * 3
  const firstCol = Math.floor(column / 3) * 3
  for (let i = firstRow; i < firstRow + 3; i++) {
    for (let j = firstCol; j < firstCol + 3; j++) {
      sudokuData[i][j] = data
    }
  }
}

/**
 * 寻找数独矩阵中非法的格子
 * 依次检查每个单元格的数字是否在1~9之间，及该数字在每行每列每块是否唯一
 * 若不唯一，则将该单元格加入到返回值中
 *
 * @param matrix 数独矩阵
 * @returns {[SudokuMatrixGrid]} 非法的数独矩阵格子数组
 */
export const findSudokuMatrixIllegalGrid = (matrix) => {
  const illegalGrid = []
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] < 1 || matrix[i][j] > 9 || !isOnly(matrix, i, j)) {
        illegalGrid.push(new SudokuMatrixGrid(i, j))
      }
    }
  }
  return illegalGrid
}

/**
 * 检查该数字在该数独中的行、列、块是否唯一
 *
 * @param matrix 数独矩阵
 * @param i      行
 * @param j      列
 * @return boolean 唯一为true, 不唯一为false
 */
const isOnly = (matrix, i, j) => {
  return checkRowIsOnly(matrix[i], j) && checkColumnIsOnly(matrix, i, j) && checkBlockIsOnly(matrix, i, j)
}

/**
 * 检查该行的数字是否唯一
 *
 * @param matrix 该行的数独矩阵
 * @param j      列
 * @return boolean 唯一为true, 不唯一为false
 */
const checkRowIsOnly = (matrix, j) => {
  for (let col = 0; col < 9; col++) {
    if (col !== j && matrix[col] === matrix[j]) {
      return false
    }
  }
  return true
}

/**
 * 检查该列的数字是否唯一
 *
 * @param matrix 数独矩阵
 * @param i      行
 * @param j      列
 * @return boolean 唯一为true, 不唯一为false
 */
const checkColumnIsOnly = (matrix, i, j) => {
  for (let row = 0; row < 9; row++) {
    if (row !== i && matrix[row][j] === matrix[i][j]) {
      return false
    }
  }
  return true
}

/**
 * 检查该区块中的数字是否唯一
 *
 * @param matrix 数独矩阵
 * @param i      行
 * @param j      列
 * @return boolean 唯一为true, 不唯一为false
 */
const checkBlockIsOnly = (matrix, i, j) => {
  for (let row = Math.floor(i / 3) * 3; row < (Math.floor(i / 3) + 1) * 3; row++) {
    for (let col = Math.floor(j / 3) * 3; col < (Math.floor(j / 3) + 1) * 3; col++) {
      if (row !== i && col !== j && matrix[row][col] === matrix[i][j]) {
        return false
      }
    }
  }
  return true
}
