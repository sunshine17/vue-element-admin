import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.res to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(authArr, route) {
  if (route.meta && route.meta.res) {
    return authArr.some(auth => route.meta.res.includes(auth))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, authArr) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(authArr, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, authArr)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, authArr, isAdmin) {
    return new Promise(resolve => {
      let accessedRoutes
      if (isAdmin) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, authArr)
      }
      // console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
