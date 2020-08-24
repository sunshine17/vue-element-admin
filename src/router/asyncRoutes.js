import Layout from '@/layout'

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export default [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    alwaysShow: true, // will always show the root menu
    name: 'user',
    meta: {
      title: 'user',
      icon: 'lock',
      res: ['user/add', 'user/update', 'user/delete', 'user/deleteBatch']
    },
    children: [{
      path: 'list',
      component: () => import('@/views/user/list'),
      name: 'userList',
      meta: { title: 'UserList' }
    }, {
      path: 'create',
      hidden: true,
      component: () => import('@/views/user/detail'),
      name: 'userCreate',
      meta: { title: 'userCreate', module: '用户', crud: 'c' }
    }, {
      path: 'detail/:id(\\d+)',
      hidden: true,
      component: () => import('@/views/user/detail'),
      name: 'userDetail',
      meta: { title: 'userDetail', module: '用户' }
      /**
    }, {
      path: 'role',
      component: () => import('@/views/user/role'),
      name: 'RolePermission',
      meta: { title: 'rolePermission' }
      */
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
