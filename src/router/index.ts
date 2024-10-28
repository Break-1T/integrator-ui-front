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
          path: 'workers',
          name: 'workers',
          component: () => import('@/components/workersPanel/WorkersPanelComponent.vue'),
          children: [
            {
              path: ':workerName/integrations',
              name: 'integrations',
              component: () => import('@/components/workersPanel/integrations/IntegrationsComponent.vue'),
            }
          ]
        },
      ],
    },
  ],
})

export default router
