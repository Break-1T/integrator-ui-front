import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/layout/LayoutComponent.vue'),
      redirect: { name: 'workers' },
      children: [
        {
          path: 'workers/:workerName?/:section?',
          name: 'workers',
          component: () => import('@/components/workersPanel/WorkersPanelComponent.vue')
        },
      ],
    },
  ],
})

export default router
