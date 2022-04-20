import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard', //访问/立刻跳转/dashboard
    children: [{
      path: 'dashboard',
      name: 'dashboard',  //侧边栏及面包屑的标题
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path:'/infoMgmt',
    component:Layout,
    name:'InfoMgmt',
    meta:{title:'信息管理',icon:'el-icon-tickets'},
    children:[
      {
        path:'enterpriseStd',
        name:'EnterpriseStd',
        component:()=>import('@/views/infoMgmt/EnterpriseStd'),
        meta:{title:'企业标准管理'}
      },
      {
        path:'groupStd',
        name:'GroupStd',
        component:()=>import('@/views/infoMgmt/GroupStd'),
        meta:{title:'团体标准管理'}
      },
      {
        path:'industryStd',
        name:'IndustryStd',
        component:()=>import('@/views/infoMgmt/IndustryStd'),
        meta:{title:'行业标准管理'}
      },
      {
        path:'nationalStd',
        name:'NationalStd',
        component:()=>import('@/views/infoMgmt/NationalStd'),
        meta:{title:'国家标准管理'}
      }
    ]
  },
  {
    path:'/userMgmt',
    component:Layout,
    name:'UserMgmt',
    meta:{title:'用户管理',icon:'el-icon-user'},
    children:[
      {
        path:'userInfo',
        name:'UserInfo',
        component:()=>import('@/views/userMgmt/UserInfo'),
        meta:{title:'用户信息'}
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
