import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/component/:id',
      component: () => import('@/pages/ComponentPage.vue'),
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
