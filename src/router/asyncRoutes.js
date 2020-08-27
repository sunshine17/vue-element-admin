import sysRoutes from './sysRoutes'

// 404 page must be placed at the end !!!
sysRoutes.push({ path: '*', redirect: '/404', hidden: true })

export default sysRoutes
