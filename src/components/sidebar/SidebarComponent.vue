<script setup lang="ts">
import { useDeploymentsStore } from '@/stores/DeploymentsStore';
import { useRouterStore } from '@/stores/RouterStore';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NewWorkerComponent from './newWorker/NewWorkerComponent.vue'; // Импортируем диалог

const toast = useToast();
const deploymentStore = useDeploymentsStore();
const router = useRouter();
const routerStore = useRouterStore();

const searchWorker = ref<string>("");
const dialogVisible = ref(false); // Видимость диалога

const workerNames = computed(() => deploymentStore.getDeployments.filter(d => d.includes(searchWorker.value)));
const selectedWorker = computed(() => routerStore.getSelectedWorker);

if (router.currentRoute.value.params.workerName) {
  routerStore.setSelectedWorker(<string>router.currentRoute.value.params.workerName);
}

const selectWorker = (workerName: string) => {
  routerStore.setSelectedWorker(workerName);
  router.push({ name: 'workers', params: { workerName: workerName, section: 'Integration Points' } });
};

// Открытие диалогового окна для создания новой интеграции
const createWorker = () => {
  dialogVisible.value = true;
};

// Закрытие диалогового окна
const closeDialog = () => {
  dialogVisible.value = false;
};

const saveIntegration = (integrationData) => {
  console.log('Сохранение интеграции:', integrationData);
  // Реализуйте логику сохранения новой интеграции
  closeDialog();
};

onMounted(async () => {
  let serviceResult = await deploymentStore.loadDeploymentNamesAsync();

  if (!serviceResult.IsSuccess) {
    toast.add({ severity: 'error', summary: 'Error', detail: serviceResult.ErrorMessage });
  }
});
</script>

<template>
  <div class="sidebar">
    <IconField class="search-bar">
      <InputIcon class="pi pi-search" />
      <InputText v-model="searchWorker" placeholder="Search" class="input" />
    </IconField>

    <button class="worker-label" :class="{ 'selected': workerName === selectedWorker }" v-for="workerName in workerNames" @click="selectWorker(workerName)">
      {{ workerName }}
    </button>

    <Button class="create-worker" label="Create Worker" icon="pi pi-plus" @click="createWorker"></Button>

    <!-- Диалоговое окно создания интеграции -->
    <NewWorkerComponent 
      :visible="dialogVisible" 
      @hide="closeDialog" 
      @save="saveIntegration" 
    />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: var(--p-surface-100);
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-top: 1px solid var(--p-surface-300);
}

.search-bar {
  margin-bottom: 1rem;
  width: 100%;
  .input {
    width: 100%;
  }
}

.worker-label {
  padding: 0.5rem;
  text-align: left;

  &.selected {
    color: var(--p-primary-900);
    text-decoration: underline;
  }

  &:hover {
    color: var(--p-primary-900);
    text-decoration: underline;
    transition: 0.1s;
  }
}

.create-worker {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
}
</style>
