import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * 这里可以把一些不需要管的路由留下，比如首页，登录，401 ，405。404别留这里，要最后一个动态加载到最末尾
 */
export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/login/login.vue')
},
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: false,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () =>
        import ('@/view/single-page/home')
    }]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/500.vue')
  },
]
