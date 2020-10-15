export class FormValidation {
  /**
   * 校验表单
   * @param selector ID选择器
   * @returns {boolean} 合法返回true，否则返回false
   */
  static validateForm(selector) {
    const $form = $(`#${selector}`)
    $form.form('validate form')
    return $form.form('is valid')
  }

  /**
   * 初始化表单校验
   * @param selector ID选择器
   * @param fields 字段校验规则
   * @param transition 过渡动画
   */
  static init(selector, fields, transition = 'slide down') {
    $(`#${selector}`).form({
      transition,
      fields,
      /**
       * 防止表单验证成功后自动发送GET请求
       */
      onSuccess() {
      }
    })
  }

  /**
   * 非空规则
   * @param fieldName 字段名
   */
  static notEmptyRule(fieldName) {
    return this._getTypeAndPrompt('empty', `${fieldName}不能为空`)
  }

  /**
   * 用户校验规则
   */
  static get usernameRules() {
    return this._getRules([
      this._getTypeAndPrompt('minLength[4]', '用户名的长度不能小于4位'),
      this._getTypeAndPrompt('maxLength[16]', '用户名的长度不能大于16位')
    ])
  }

  /**
   * 密码校验规则
   */
  static get passwordRules() {
    return this._getRules([
      this._getTypeAndPrompt('minLength[6]', '密码的长度不能小于6位'),
      this._getTypeAndPrompt('maxLength[32]', '密码的长度不能大于32位')
    ])
  }

  static get repeatPasswordRules() {
    return this._getRules([
      this._getTypeAndPrompt('match[password]', '重复输入的密码与密码不一致')
    ])
  }

  static get nicknameRules() {
    return this._getRules([
      this._getTypeAndPrompt('minLength[4]', '昵称的长度不能小于4位'),
      this._getTypeAndPrompt('maxLength[32]', '昵称的长度不能大于32位')
    ])
  }

  /**
   * 验证码校验规则
   */
  static get captchaRules() {
    return this._getRules([
      this._getTypeAndPrompt('exactLength[4]', '验证码的长度必须为4位')
    ])
  }

  /**
   * 获取rules对象
   * @param rules 校验规则
   * @returns {{rules: *[]}} rules对象
   * @private
   */
  static _getRules(rules = []) {
    return { rules }
  }

  /**
   * 获取校验类型和校验失败时的提示
   * @param type 校验类型
   * @param prompt 校验失败时的提示
   * @returns {{type: String, prompt: String}} 包含type和prompt属性的对象
   * @private
   */
  static _getTypeAndPrompt(type, prompt) {
    return { type, prompt }
  }
}
