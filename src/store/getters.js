const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  addRouters: state => state.permission.addRouters,
  user: state => state.user.user,
  token: state => state.user.token,
  roleNameList(state) {
    const roleList = state.user.user.roleList
    // 去除角色名的前缀ROLE_
    return roleList.map(role => role.name.slice(5))
  }
}

export default getters
