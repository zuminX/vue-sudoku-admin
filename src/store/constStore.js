import { getRoleList } from '@/api/roleApi'
import { getSudokuLevels } from '@/api/gameApi'

export const constStore = {
  data: {
    _sudokuLevelList: null,
    _roleList: null
  },
  /**
   * 获取数独等级列表
   * @returns {Promise<*>} 数独等级列表
   */
  getSudokuLevelList() {
    return this._singletonRequest(getSudokuLevels, '_sudokuLevelList')
  },
  /**
   * 获取排行名列表
   * @returns {Promise<*>} 排行名列表
   */
  async getRoleNameList() {
    return this._singletonRequest(getRoleList, '_roleList')
  },
  /**
   * 只在第一次调用时实际发起请求，之后调用都直接返回缓存值
   * @param request 请求方法
   * @param dataName 数据名
   * @returns {Promise<*>} 请求数据
   * @private
   */
  async _singletonRequest(request, dataName) {
    if (!this.data[dataName]) {
      const { success, data } = await request()
      if (success) {
        this.data[dataName] = data
      }
    }
    return this.data[dataName]
  }
}
