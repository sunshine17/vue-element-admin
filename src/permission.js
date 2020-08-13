import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      return next()
    }
    // other pages that do not have permission to access are redirected to the login page.
    next(`/login?redirect=${to.path}`)
    NProgress.done()
    return
  }

  if (to.path === '/login') {
    // if is logged in, redirect to the home page
    next({ path: '/' })
    NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    return
  }

  // determine whether the user has obtained his permission authArr through getInfo
  if (store.getters.initiated) {
    return next()
  }
  try { // Initiate authArr and async routes
    // const { authArr, isAdmin } = await store.dispatch('user/getInfo')
    const userInfo = await store.dispatch('user/getInfo')
    // console.log('===> isAdmin: ' + isAdmin)

    // generate accessible routes map based on authArr
    // const accessRoutes = await store.dispatch('permission/generateRoutes', { authArr: authArr, isAdmin: isAdmin })
    const accessRoutes = await store.dispatch('permission/generateRoutes', userInfo)

    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({ ...to, replace: true })
  } catch (error) {
    // remove token and go to login page to re-login
    await store.dispatch('user/resetToken')
    Message.error(error || 'Has Error')
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
}) // beforeEach()

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
