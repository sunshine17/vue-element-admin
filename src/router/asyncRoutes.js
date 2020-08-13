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
      meta: { title: 'User List' }
      /**
    }, {
      path: 'update',
      component: () => import('@/views/user/update'),
      name: 'userUpdate',
      meta: { title: 'userUpdate' }
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
