import Vue from 'vue'

/**
 * 判断角色列表中是否包含管理员
 * @param roleList 角色列表
 * @returns {boolean} 包含则返回true，否则返回false
 */
export const roleListHasAdmin = (roleList) => {
  return roleList ? (roleList.map(role => role.name)).includes('ROLE_ADMIN') : false
}

/**
 * 判断角色名是否为管理员
 * @param roleName 角色名
 * @returns {boolean} 是则返回true，否则返回false
 */
export const roleNameHasAdmin = (roleName) => {
  return roleName === 'ROLE_ADMIN'
}

/**
 * 响应式的设置数独矩阵中的一个格子
 * @param array 数独矩阵
 * @param sudokuMatrixGrid 数独矩阵中的一个格子
 */
export const responseSetTwoDimensionalArray = (array, sudokuMatrixGrid) => {
  const { row, column, value } = sudokuMatrixGrid
  const rowArrayData = array[row]
  rowArrayData[column] = value
  Vue.set(array, row, rowArrayData)
}
