import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'

function hasPermission(roles, route) {
  return route.meta && route.meta.role ? roles.some(role => route.meta.role.indexOf(role) >= 0) : true
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = asyncRouterMap.filter(v => {
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                return hasPermission(roles, child)
              })
            }
            return true
          }
          return false
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
