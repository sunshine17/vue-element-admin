import Layout from '@/layout'

import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
}, {
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
}, {
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', affix: false }
  }]
}, {
  path: '/guide',
  component: Layout,
  redirect: '/guide/index',
  meta: { title: 'documentation', icon: 'documentation', affix: false },
  children: [{
    path: 'index',
    component: () => import('@/views/guide/index'),
    name: 'Guide',
    meta: { title: 'guide', icon: 'guide', noCache: true }
  }, {
    path: '/documentation',
    component: () => import('@/views/documentation/index'),
    name: 'Documentation',
    meta: { title: 'documentation', icon: 'documentation', affix: false }
  }, {
    path: '/icon',
    component: () => import('@/views/icons/index'),
    name: 'Icons',
    meta: { title: 'icons', icon: 'icon', noCache: true }
  },
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/example',
    component: () => import('@/views/nested/default'), // Parent router-view
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'el-icon-s-help'
    },
    children: [{
      path: 'create',
      component: () => import('@/views/example/create'),
      name: 'CreateArticle',
      meta: { title: 'createArticle', icon: 'edit', res: ['artical/add', 'artical/update'] }
    }, {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/example/edit'),
      name: 'EditArticle',
      meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
      hidden: true
    }, {
      path: 'list',
      component: () => import('@/views/example/list'),
      name: 'ArticleList',
      meta: { title: 'articleList', icon: 'list' }
    }]
  }, {
    path: '/tab',
    component: () => import('@/views/nested/default'), // Parent router-view
    children: [{
      path: 'index',
      component: () => import('@/views/tab/index'),
      name: 'Tab',
      meta: { title: 'tab', icon: 'tab' }
    }]
  }, {
    path: '/error',
    component: () => import('@/views/nested/default'), // Parent router-view
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: { title: 'errorPages', icon: '404' },
    children: [{
      path: '401',
      component: () => import('@/views/error-page/401'),
      name: 'Page401',
      meta: { title: 'page401', noCache: true }
    }, {
      path: '404',
      component: () => import('@/views/error-page/404'),
      name: 'Page404',
      meta: { title: 'page404', noCache: true }
    }]
  }, {
    path: '/error-log',
    component: () => import('@/views/nested/default'), // Parent router-view
    children: [{
      path: 'log',
      component: () => import('@/views/error-log/index'),
      name: 'ErrorLog',
      meta: { title: 'errorLog', icon: 'bug' }
    }]
  }, {
    path: '/excel',
    component: () => import('@/views/nested/default'), // Parent router-view
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [{
      path: 'export-excel',
      component: () => import('@/views/excel/export-excel'),
      name: 'ExportExcel',
      meta: { title: 'exportExcel' }
    }, {
      path: 'export-selected-excel',
      component: () => import('@/views/excel/select-excel'),
      name: 'SelectExcel',
      meta: { title: 'selectExcel' }
    }, {
      path: 'export-merge-header',
      component: () => import('@/views/excel/merge-header'),
      name: 'MergeHeader',
      meta: { title: 'mergeHeader' }
    }, {
      path: 'upload-excel',
      component: () => import('@/views/excel/upload-excel'),
      name: 'UploadExcel',
      meta: { title: 'uploadExcel' }
    }]
  }, {
    path: '/zip',
    component: () => import('@/views/nested/default'), // Parent router-view
    redirect: '/zip/download',
    // alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [{
      path: 'download',
      component: () => import('@/views/zip/index'),
      name: 'ExportZip',
      meta: { title: 'exportZip' }
    }]
  }, {
    path: '/pdf',
    component: () => import('@/views/nested/default'), // Parent router-view
    redirect: '/pdf/index',
    children: [{
      path: 'index',
      component: () => import('@/views/pdf/index'),
      name: 'PDF',
      meta: { title: 'pdf', icon: 'pdf' }
    }]
  }, {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  }, {
    path: '/theme',
    component: () => import('@/views/nested/default'), // Parent router-view
    children: [{
      path: 'index',
      component: () => import('@/views/theme/index'),
      name: 'Theme',
      meta: { title: 'theme', icon: 'theme' }
    }]
  }, {
    path: '/clipboard',
    component: () => import('@/views/nested/default'), // Parent router-view
    children: [{
      path: 'index',
      component: () => import('@/views/clipboard/index'),
      name: 'ClipboardDemo',
      meta: { title: 'clipboardDemo', icon: 'clipboard' }
    }]
  }, {
    path: '/i18n',
    component: () => import('@/views/nested/default'), // Parent router-view
    children: [{
      path: 'index',
      component: () => import('@/views/i18n-demo/index'),
      name: 'I18n',
      meta: { title: 'i18n', icon: 'international' }
    }]
  }, {
    path: 'external-link',
    component: () => import('@/views/nested/default'), // Parent router-view
    children: [{
      path: 'https://www.bing.com',
      meta: { title: 'externalLink', icon: 'link' }
    }]
  }]
}, { // END of Guide
  path: '/profile',
  component: Layout,
  redirect: '/profile/index',
  hidden: true,
  children: [{
    path: 'index',
    component: () => import('@/views/profile/index'),
    name: 'Profile',
    meta: { title: 'profile', icon: 'user', noCache: true }
  }]
}]
