<script setup lang="ts">
import { useRouterStore } from '@/stores/RouterStore';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RecordTransfersComponent from './recordTransfers/RecordTransfersComponent.vue';
import TransformRecordsComponent from './transformRecords/TransformRecordsComponent.vue';
import IntegrationsComponent from './integrations/IntegrationsComponent.vue';

const route = useRoute();
const router = useRouter();
const routerStore = useRouterStore();

const tabs = [
  { index: 0, name: 'Integration Points' },
  { index: 1, name: 'Record Transfers' },
  { index: 2, name: 'Transform Records' },
];

const selectedWorker = computed(() => routerStore.getSelectedWorker ?? '');
const selectedSection = computed(() => tabs.find(tab => tab.name === route.params.section)?.index ?? 0);
const workerIsSelected = computed(() => !!routerStore.getSelectedWorker);

const updateTab = (index: number) => {
  router.push({
    name: route.name,
    params: {
      workerName: route.params.workerName,
      section: tabs.find(tab => tab.index === index)?.name,
    },
  });
};
</script>

<template>
  <div class="container">
    <div v-if="workerIsSelected" class="workers-panel">
      <div class="worker-tag">{{ selectedWorker }}</div>
      <Tabs :value="selectedSection" @update:value="updateTab" class="tabs">
        <TabList lazy>
          <Tab v-for="tab in tabs" :key="tab.index" :value="tab.index">{{ tab.name }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel :value="0">
            <IntegrationsComponent :workerName="selectedWorker"/>
          </TabPanel>
          <TabPanel :value="1">
            <RecordTransfersComponent :workerName="selectedWorker" />
          </TabPanel>
          <TabPanel :value="2">
            <TransformRecordsComponent :workerName="selectedWorker" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <div v-else class="select-worker-info">
      <span>Please, select worker from the left menu</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: var(--p-surface-300);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.select-worker-info {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--p-text-secondary);
  font-size: 1.2em;
}

.workers-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: 1rem;
}

.worker-tag {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--p-text-primary);
  background-color: var(--p-surface-400);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  align-self: flex-start;
  margin: 0.5rem;
}

.tabs {
  flex: 1;
}
</style>
