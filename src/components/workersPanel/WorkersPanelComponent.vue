<script setup lang="ts">
import { useRouterStore } from '@/stores/RouterStore';
import { computed } from 'vue';

const routerStore = useRouterStore();

const workerIsSelected = computed(() => routerStore.getSelectedWorker != null && routerStore.getSelectedWorker != undefined);

</script>

<style lang="scss" scoped>
.select-worker-info {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div v-if="workerIsSelected">
    <router-view></router-view>
  </div>
  <div v-else class="select-worker-info">
    <span>Please, select worker from left menu</span>
  </div>
</template>
