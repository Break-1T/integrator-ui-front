<script setup lang="ts">
import { useRouterStore } from '@/stores/RouterStore';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RecordTransfersComponent from './RecordTransfers/RecordTransfersComponent.vue';
import TransformRecordsComponent from './TransformRecords/TransformRecordsComponent.vue';

const route = useRoute();
const router = useRouter();
const routerStore = useRouterStore();

const tabs = [
  {
    index: 0,
    name: 'Integration Points',
  },
  {
    index: 1,
    name: 'Record Transfers',
  },
  {
    index: 2,
    name: 'Transform Records',
  },
];

const selectedWorker = computed(() => <string>routerStore.getSelectedWorker);
const selectedSection = computed(() => tabs.find(x => x.name === <string>route.params["section"])?.index ?? '');
const workerIsSelected = computed(() => routerStore.getSelectedWorker != null && routerStore.getSelectedWorker != undefined);

const updateTab = (index: number) => {
  router.push({ name: route.name, params: { workerName: route.params.workerName, section: tabs.find(x => x.index === index)?.name } });
};

</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: var(--p-surface-300);
  overflow: hidden;
}

.select-worker-info {
  height: 100%;
  width: 100%;

  background-color: var(--p-surface-300);
  display: flex;
  justify-content: center;
  align-items: center;
}

.workers-panel {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  overflow: hidden;

  .config {
    flex: 0;
  }

  .selection {
    flex: 1 0 auto;

    .tabs {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <div class="container">
    <div v-if="workerIsSelected" class="workers-panel">
      <div class="config">
        <Tag severity="secondary" :value="selectedWorker" style="font-size:x-large;" />
      </div>
      <div class="selection">
        <Tabs :value="selectedSection" @update:value="updateTab" class="tabs">
          <TabList lazy>
            <Tab v-for="tab in tabs" :value="tab.index">{{ tab.name }}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel :value="0">
              teeeeeeeeeeeeeext!
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

    </div>
    <div v-else class="select-worker-info">
      <span>Please, select worker from left menu</span>
    </div>
  </div>
</template>
