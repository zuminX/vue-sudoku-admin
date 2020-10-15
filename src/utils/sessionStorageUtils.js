/**
 * 向storage中设置数据
 * @param key
 * @param value
 */
export const setData = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从storage中取出数据
 * @param key
 */
export const getData = (key) => {
  const data = window.sessionStorage.getItem(key)
  return data ? JSON.parse(data) : data
}
