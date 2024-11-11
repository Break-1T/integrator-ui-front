<template>
  <div class="container">
    <div v-if="workerIsSelected" class="workers-panel">
      <div class="worker-tag">{{ selectedWorker }}</div>

      <!-- Панель вкладок -->
      <div class="tabs-panel">
        <router-link v-for="tab in tabs" :key="tab.index"
          :to="{ name: tab.routeName, params: { workerName: selectedWorker } }" class="tab-link"
          :class="{ active: route.name === tab.routeName }">
          {{ tab.name }}
        </router-link>
      </div>

      <!-- Контейнер для router-view с ограничением высоты -->
      <div class="content">
        <router-view :workerName="selectedWorker" />
      </div>
    </div>
    <div v-else class="select-worker-info">
      <span>Please, select worker from the left menu</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouterStore } from '@/stores/RouterStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routerStore = useRouterStore();

const tabs = [
  { index: 0, name: 'Integration Points', routeName: 'IntegrationPoints' },
  { index: 1, name: 'Record Transfers', routeName: 'RecordTransfers' },
  { index: 2, name: 'Transform Records', routeName: 'TransformRecords' },
];

const selectedWorker = computed(() => routerStore.getSelectedWorker ?? '');
const workerIsSelected = computed(() => !!routerStore.getSelectedWorker);
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: var(--p-surface-300);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box;
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

.tabs-panel {
  display: flex;
  gap: 0;
  background-color: var(--p-surface-400);
  border-radius: 0.5rem;
  overflow: hidden;
}

.tab-link {
  text-decoration: none;
  color: var(--p-text-primary);
  padding: 0.5rem 1rem;
  flex: 1;
  text-align: center;
  transition: background-color 0.3s;
}

.tab-link:hover {
  background-color: var(--p-surface-500);
}

.tab-link.active {
  background-color: var(--p-primary-500);
  color: white;
}

/* Ограничение контента router-view */
.content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--p-surface-200);
  border-radius: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  max-height: calc(100% - 5rem);
  /* Ограничение высоты с учетом панели вкладок и отступов */
}
</style>
