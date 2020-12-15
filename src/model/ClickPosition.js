/**
 * 点击位置类
 */
export class ClickPosition {
  _row;
  _column;

  constructor(row = -1, column = -1) {
    this._row = row;
    this._column = column;
  }

  /**
   * 判断该点击位置对象是否是初始化状态
   * @param clickPosition 点击位置对象
   * @returns {boolean} 是初始化则返回true，不是则返回false
   */
  static isInit(clickPosition) {
    return clickPosition.row === -1 || clickPosition.column === -1;
  }

  /**
   * 判断该点击位置对象是否不是初始化状态
   * @param clickPosition 点击位置对象
   * @returns {boolean} 不是初始化则返回true，是则返回false
   */
  static isNotInit(clickPosition) {
    return !ClickPosition.isInit(clickPosition);
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }
}
