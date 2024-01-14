import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/main/MainPage.vue'),
    },
    {
      path: '/auth/signup',
      name: 'auth-signup',
      component: () => import('@/views/auth/AuthSignup.vue'),
    },
    {
      path: '/auth/login',
      name: 'auth-login',
      component: () => import('@/views/auth/AuthLogin.vue'),
    },
    {
      path: '/post/list',
      name: 'post-list',
      component: () => import('@/views/post/PostList.vue'),
    },
    {
      path: '/post/detail',
      name: 'post-detail',
      component: () => import('@/views/post/PostDetail.vue'),
    },
    {
      path: '/post/write',
      name: 'post-write',
      component: () => import('@/views/post/PostEdit.vue'),
    },
    {
      path: '/post/update',
      name: 'post-update',
      component: () => import('@/views/post/PostEdit.vue'),
    },
  ]
})

export default router
