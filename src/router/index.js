import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //登录页,异步组件的写法
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') }
      ]
    },
    { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
    { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
    { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') }
  ]
})

// 登录访问拦截
// 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
router.beforeEach(async (to) => {
  //获取token
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    // 将用户重定向到登录页面
    return '/login'
  }
})

export default router
