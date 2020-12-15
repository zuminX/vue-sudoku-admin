import {
  getData,
  setData
} from '@/utils/sessionStorageUtils'

const state = {
  user: getData('user'),
  token: getData('token')
}

const mutations = {
  /**
   * 设置用户
   */
  SET_USER(state, user) {
    setData('user', user)
    state.user = user
  },
  /**
   * 设置令牌
   */
  SET_TOKEN(state, token) {
    setData('token', token)
    state.token = token
  }
}

const action = {}

export default {
  state,
  mutations,
  action,
  modules: {}
}
