import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

// 所有权限通用路由表
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

// 异步挂载的路由
export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '概览',
        icon: 'dashboard',
        role: ['ADMIN']
      }
    }]
  },
  {
    path: '/info',
    component: Layout,
    meta: {
      title: '信息列表',
      icon: 'table',
      role: ['ADMIN']
    },
    children: [
      {
        path: 'user-table',
        component: () => import('@/views/info-table/user-table/index'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'game-record-table',
        component: () => import('@/views/info-table/game-record-table/index'),
        meta: {
          title: '游戏记录列表'
        }
      }
    ]
  },
  {
    path: '/sudokuRace',
    component: Layout,
    children: [{
      path: '',
      name: 'SudokuRace',
      component: () => import('@/views/sudoku-race/index'),
      meta: {
        title: '数独竞赛',
        icon: 'race'
      }
    }]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'http://47.116.68.80:8082/home',
        meta: {
          title: '数独游戏首页',
          icon: 'link'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

const originalPush = VueRouter.prototype.push

/**
 * 解决重定向时报错
 * @param location
 * @param onResolve
 * @param onReject
 * @returns {Promise<Route | *>|Promise<Route>|void}
 */
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  return onResolve || onReject ? originalPush.call(this, location, onResolve, onReject) : originalPush.call(this, location).catch(
    err => err)
}
