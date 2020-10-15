import {
  getData,
  setData
} from '@/utils/sessionStorageUtils'

const state = {
  user: getData('user'),
  token: getData('token')
}

const mutations = {
  SET_USER(state, user) {
    setData('user', user)
    state.user = user
  },
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
