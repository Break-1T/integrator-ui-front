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
          path: 'workers/:workerName?',
          name: 'workers',
          component: () => import('@/components/workersPanel/WorkersPanelComponent.vue'),
          children:[
            {
              path: 'integration-points',
              name: 'IntegrationPoints',
              component: () => import('@/components/workersPanel/integrations/IntegrationsComponent.vue'),
            },
            {
              path: 'record-transfers',
              name: 'RecordTransfers',
              component: () => import('@/components/workersPanel/recordTransfers/RecordTransfersComponent.vue'),
            },
            {
              path: 'transform-records',
              name: 'TransformRecords',
              component: () => import('@/components/workersPanel/transformRecords/TransformRecordsComponent.vue'),
            }
          ]
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/LoginComponent.vue'),
    }
  ],
})

export default router
