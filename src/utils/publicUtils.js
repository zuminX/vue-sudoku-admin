/**
 * 显示侧边栏
 * @param selector ID选择器
 */
export const showSidebar = (selector) => {
  $(`#${selector}`).sidebar('toggle')
}

/**
 * 显示成功的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showSuccessToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'success',
      position,
      showIcon: 'checkmark',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 显示警告的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showWarnToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'warning',
      position,
      showIcon: 'exclamation',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 显示错误的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showErrorToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'error',
      position,
      showIcon: 'remove',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 深拷贝数据
 * @param data 数据
 * @returns {string} 拷贝数据
 */
export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 获取二维number型数组
 * @returns {number[][]} 二维number型数组
 */
export const getTwoDimeNumArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, 0)
}

/**
 * 获取二维boolean型数组
 * @returns {boolean[][]} 二维boolean型数组
 */
export const getTwoDimeBoolArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, false)
}

/**
 * 格式化毫秒为秒
 * @param milliseconds 毫秒
 * @returns {string} 对应的秒
 */
export const formatShowMS = (milliseconds) => {
  if (!milliseconds || typeof milliseconds !== 'number' || milliseconds === -Infinity || milliseconds === Infinity) {
    return '--'
  }
  return Math.ceil(milliseconds / 1000) + ''
}

/**
 * 格式化空数据
 * @param data 数据
 * @returns {string} 格式化后的数据
 */
export const formatEmptyData = (data) => {
  return data || '----'
}

/**
 * 初始化菜单项
 * @param selector 选择器
 * @param contentSelector 内容项的选择器
 */
export const initMenuItem = (selector, contentSelector = null) => {
  $(selector).tab({
    history: false,
    content: contentSelector ? $(contentSelector) : undefined
  })
}

/**
 * 获取二维数组
 * @param row 行
 * @param column 列
 * @param initData 初始数据啊
 * @returns {[]} 二维数组
 */
const getTwoDimeArray = (row, column, initData) => {
  const result = []
  for (let i = 0; i < row; i++) {
    result.push([])
    for (let j = 0; j < column; j++) {
      result[i].push(initData)
    }
  }
  return result
}

