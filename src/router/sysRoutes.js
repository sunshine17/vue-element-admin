import Layout from '@/layout'

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
      component: () => import('@/views/admin/user/list'),
      name: 'userList',
      meta: { title: 'UserList' }
    }, {
      path: 'create',
      hidden: true,
      component: () => import('@/views/admin/user/detail'),
      name: 'userCreate',
      meta: { title: 'userCreate', module: '用户', crud: 'c' }
    }, {
      path: 'detail/:id(\\d+)',
      hidden: true,
      component: () => import('@/views/admin/user/detail'),
      name: 'userDetail',
      meta: { title: 'userDetail', module: '用户' }
      /**
    }, {
      path: 'role',
      component: () => import('@/views/admin/user/role'),
      name: 'RolePermission',
      meta: { title: 'rolePermission' }
      */
    }]
  }
]
