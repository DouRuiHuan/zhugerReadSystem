import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const constantRoutes = [
  // 登录的路由
  {
    path: '/login',
    component: () => import('@/views/login/index'),  //组件的懒加载
    hidden: true  //控制在导航栏不显示的
  },
  // 404
  { path: '/404', component: () => import('@/views/404'), hidden: true },
 
 
  {
    path: '/',
    component: Layout, 
    redirect: '/home/index',  //初始路径下重定向到首页
    name: '首页',
    hidden: true
  },
  // 首页
  {
    path: '/home',
    component: Layout, //统一带有的Layout布局
    // redirect: '/home/index',
    name: 'home',
    meta: { icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/home/index'),  //引入的组件
        meta: { title: '首页' }
      }
    ]
  },

  {
    path: '/books',
    component: Layout,
    redirect: '/books/index',
    name: 'books',
    meta: { title: '书籍管理', icon: 'clipboard' },
    children: [
      {
        path: 'index',
        name: 'booksIndex',
        component: () => import('@/views/booksManagement/index'),
        meta: { keepAlive: true }
      },
      {
        path: 'addBook',
        name: 'addBook',
        hidden: true,
        component: () => import('@/views/booksManagement/addBook'),
        meta: { title: '添加书籍' }
      },
      {
        path: 'stage',
        name: 'stage',
        hidden: true,
        redirect: 'noredirect',
        component: () => import('@/views/booksManagement/index_box'),
        meta: { title: '关卡' },
        children: [
          {
            path: 'index',
            name: 'stageIndex',
            hidden: true,
            component: () => import('@/views/booksManagement/stage'),
            meta: { keepAlive: true }
          },
          {
            path: 'addStage',
            name: 'addStageIndex',
            hidden: true,
            component: () => import('@/views/booksManagement/addStage'),
            meta: { title: '添加新关卡' }
          },
          {
            path: 'section',
            name: 'section',
            hidden: true,
            redirect: 'noredirect',
            component: () => import('@/views/booksManagement/index_box'),
            meta: { title: '章节管理' },
            children: [
              {
                path: 'index',
                name: 'sectionIndex',
                hidden: true,
                component: () => import('@/views/booksManagement/section'),
                meta: { keepAlive: true }
              },
              {
                path: 'addsection',
                name: 'addsection',
                hidden: true,
                component: () => import('@/views/booksManagement/addSection'),
                meta: { title: '添加新章' }
              }
            ]
          }
        ]
      }
    ]
  },
// 新版书籍管理
  {
    path: '/dbooks',
    component: Layout,
    redirect: '/dbooks/index',
    name: 'dbooks',
    hidden: true,
    meta: { title: '新版书籍管理', icon: 'clipboard' },
    children: [
      {
        path: 'index',
        name: 'dbooksIndex',
        component: () => import('@/views/dnewBooksManagement')
      }
    ]

  },
  {
    path: '/preview',
    component: Layout,
    redirect: '/preview/index',
    name: 'preview',
    meta: { icon: 'guide' },
    children: [
      {
        path: 'index',
        name: 'previewIndex',
        component: () => import('@/views/booksManagement/preview'),
        meta: { title: '关卡预览' }
      }
    ]
  },
  {
    path: '/bookList',
    component: Layout,
    redirect: '/bookList/index',
    name: 'bookList',
    meta: { title: '书单管理', icon: 'list' },
    children: [
      {
        path: 'index',
        name: 'bookListIndex',
        component: () => import('@/views/booksList/index'),
        meta: { keepAlive: true }
      },
      {
        path: 'addBookList',
        name: 'addBookList',
        hidden: true,
        component: () => import('@/views/booksList/addBookList'),
        meta: { title: '添加书单' }
      }
    ]
  },
  {
    path: '/companion',
    component: Layout,
    redirect: '/companion/map',
    name: 'companion',
    meta: { title: '同伴管理', icon: 'peoples' },
    children: [
      {
        path: 'map',
        name: 'map',
        redirect: '/companion/map/index',
        component: () => import('@/views/companion/index'),
        meta: { title: '同伴图鉴' },
        children: [
          {
            path: 'index',
            name: 'mapIndex',
            hidden: true,
            component: () => import('@/views/companion/map'),
            meta: { keepAlive: true }
          },
          {
            path: 'addMap',
            name: 'addMap',
            hidden: true,
            component: () => import('@/views/companion/addMap'),
            meta: { title: '添加同伴' }
          }
        ]
      },
      {
        path: 'combination',
        name: 'combination',
        redirect: '/companion/combination/index',
        component: () => import('@/views/companion/index'),
        meta: { title: '同伴组合' },
        children: [
          {
            path: 'index',
            name: 'combinationIndex',
            hidden: true,
            component: () => import('@/views/companion/combination'),
            meta: { keepAlive: true }
          },
          {
            path: 'addCombination',
            name: 'addCombination',
            hidden: true,
            component: () => import('@/views/companion/addCombination'),
            meta: { title: '添加同伴组合' }
          }
        ]
      }
    ]
  },
  {
    path: '/redeemCode',
    component: Layout,
    redirect: '/redeemCode/index',
    name: 'redeemCode',
    meta: { title: '兑换码', icon: 'star' },
    children: [
      {
        path: 'index',
        name: 'redeemCodeIndex',
        component: () => import('@/views/redeemCode/index')
      },
      {
        path: 'addRedeemCode',
        name: 'addRedeemCode',
        hidden: true,
        component: () => import('@/views/redeemCode/addRedeemCode'),
        meta: { title: '创建兑换码' }
      },
      {
        path: 'checkRedeemCode',
        name: 'checkRedeemCode',
        hidden: true,
        component: () => import('@/views/redeemCode/checkRedeemCode'),
        meta: { title: '查看兑换码' }
      }
    ]
  },
  {
    path: '/parameterSetting',
    component: Layout,
    redirect: '/parameterSetting/index',
    name: 'parameterSetting',
    meta: { icon: 'tree' },
    children: [
      {
        path: 'index',
        name: 'parameterSettingIndex',
        component: () => import('@/views/parameterSetting/index'),
        meta: { title: '参数设置' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    name: 'message',
    meta: { icon: 'star' },
    children: [
      {
        path: 'index',
        name: 'messageIndex',
        component: () => import('@/views/message/index'),
        meta: { title: '消息列表' }
      },
      {
        path: 'add',
        name: 'addMessage',
        hidden: true,
        component: () => import('@/views/message/addMessage'),
        meta: { title: '新增消息' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/user',
    name: 'permission',
    hidden: true,
    meta: { title: '数据统计', icon: 'chart' },
    children: [
      {
        path: 'user',
        name: 'userData',
        component: () => import('@/views/statistic/userData'),
        meta: { title: '用户统计' }
      },
      {
        path: 'reading',
        name: 'reading',
        component: () => import('@/views/statistic/readingData'),
        meta: { title: '阅读统计' }
      }
    ]
  },

  {
    path: '/learning',
    hidden: true,
    name: 'learning',
    component: Layout,
    redirect: '/learning/learningIndex',
    meta: { title: '学习数据', icon: 'chart' },
    children: [
      {
        path: 'learningIndex',
        name: 'learningIndex',
        hidden: true,
        component: () => import('@/views/dlearning')
      },
      {
        path: 'learningDetail',
        name: 'learningDetail',
        hidden: true,
        meta: { title: '学习明细' },
        component: () => import('@/views/dlearning/learningDetail')
      },
      {
        path: 'userDetail',
        name: 'userDetail',
        hidden: true,
        meta: { title: '用户明细' },
        component: () => import('@/views/dlearning/userDetail')
      }
    ]
  },
  {
    path: '/userManagement',
    component: Layout,
    redirect: '/userManagement/index',
    name: 'userManagement',
    hidden: true, 
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'userManagementIndex',
        component: () => import('@/views/user/index')
      },
      {
        path: 'detail',
        name: 'detail',
        hidden: true,
        redirect: '/userManagement/detail/index',
        component: () => import('@/views/user/index_box'),
        meta: { title: '用户详情' },
        children: [
          {
            path: 'index',
            name: 'detailIndex',
            hidden: true,
            component: () => import('@/views/user/userDetail')
          },
          {
            path: 'freeBooks',
            name: 'freeBooks',
            hidden: true,
            component: () => import('@/views/user/freeBooks'),
            meta: { title: '免费书单' }
          }
        ]
      }
    ]
  },

  // 新用户管理
  {
    path: '/duserManagement',
    name: 'duserManagement',
    component: Layout,
    hidden: true,
    redirect: '/duserManagement/index',
    meta: { title: '新用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'duserManagementIndex',
        hidden: true,
        component: () => import('@/views/dusermanagement/index')
      },
      {
        path: 'details',
        name: 'details',
        hidden: true,
        meta: { title: '用户详情' },
        redirect: '/dusermanagement/details/detailsIndex',
        component: () => import('@/views/dusermanagement/detailIndex'),
        children: [
          {
            path: 'detailsIndex',
            name: 'detailsIndex',
            hidden: true,
            component: () => import('@/views/dusermanagement/details')
          },
          {
            path: 'progress',
            name: 'progress',
            hidden: true,
            meta: { title: '书籍阅读进度' },
            component: () => import('@/views/dusermanagement/readingprogress')
          },
          {
            path: 'dcompanion',
            name: 'dcompanion',
            hidden: true,
            meta: { title: '同伴收集进度' },
            component: () => import('@/views/dusermanagement/companionprogress')
          }
        ]
      }
    ]
  },


  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/admin',
    name: 'permission',
    hidden: true,
    meta: { title: '权限管理', icon: 'lock' },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/permissionSetting/admin'),
        meta: { title: '管理员' }
      },
      {
        path: 'permission',
        name: 'permission',
        hidden: true,
        component: () => import('@/views/permissionSetting/permission'),
        meta: { title: '权限设置' }
      }
    ]
  },
  // 新权限管理
  {
    path: '/power',
    name: 'power',
    component: Layout,
    hidden: true,
    redirect: '/power/index',
    meta: { title: '新权限管理', icon: 'lock' },
    children: [
      {
        path: 'powerIndex',
        name: 'powerIndex',
        meta: { title: '管理员权限配置' },
        component: () => import('@/views/dpower')
      },
      {
        path: 'groupPower',
        name: 'groupPower',
        meta: { title: '组权限配置' },
        component: () => import('@/views/dpower/groupPower')
      }
    ]

  },




  {
    path: '/changePwd',
    component: Layout,
    redirect: '/changePwd/index',
    hidden: true,
    name: 'changePwd',
    meta: { icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'changePwdIndex',
        component: () => import('@/views/login/changePwd'),
        meta: { title: '修改密码' }
      }
    ]
  },

  // 离线打包
  {
    path: '/linePack',
    component: Layout,
    name: 'linePack',
    meta: { icon: 'linePack' },
    // hidden:true,
    children: [
      {
        path: 'index',
        name: 'linePackIndex',
        component: () => import('@/views/dlinePack/index'),
        meta: { title: '离线打包' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]


export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
