import { login, logout, getInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
import { hex_md5 } from '@/utils/md5'

const state = {
  usr: undefined,
  initiated: false,
  isAdmin: false,
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  authArr: []
}

const mutations = {

  SET_USR: (state, usr) => {
    state.usr = usr
  },

  SET_INITIATED: (state, isDone) => {
    state.initiated = isDone
  },
  SET_IS_ADMIN: (state, isAdmin) => {
    state.isAdmin = isAdmin
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTH_ARR: (state, authArr) => {
    state.authArr = authArr
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), passwd: hex_md5(password) }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        // const { authArr, name, avatar, introduction } = data
        const { name, authArr, isAdmin } = data

        // authArr must be a non-empty array
        if (!authArr || authArr.length <= 0) {
          commit('SET_AUTH_ARR', [])
        } else {
          commit('SET_AUTH_ARR', authArr)
        }

        commit('SET_USR', data)
        commit('SET_NAME', name)
        commit('SET_IS_ADMIN', isAdmin)
        commit('SET_INITIATED', true)

        const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_AUTH_ARR', [])
        commit('SET_INITIATED', false)
        removeToken()
        // resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_AUTH_ARR', [])
      removeToken()
      resolve()
    })
  }

  // dynamically modify permissions
  /**
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
  */
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
