<script setup lang="ts">
import { useDeploymentsStore } from '@/stores/DeploymentsStore';
import { useRouterStore } from '@/stores/RouterStore';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const toast = useToast();
const deploymentStore = useDeploymentsStore();
const router = useRouter();
const routerStore = useRouterStore();

const searchWorker = ref<string>("");

const workerNames = computed(() => deploymentStore.getDeployments.filter(d => d.includes(searchWorker.value)));
const selectedWorker = computed(() => routerStore.getSelectedWorker);

const selectWorker = (workerName: string) => {
  routerStore.setSelectedWorker(workerName);
  router.push({name: 'integrations', params: {workerName: workerName}});
}

const createWorker = () => {

}

onMounted(async () => {
    let serviceResult = await deploymentStore.loadDeploymentNamesAsync();

    if (!serviceResult.IsSuccess) {
      toast.add({ severity: 'error', summary: 'Error', detail: serviceResult.ErrorMessage });
    }
});

</script>

<template>
    <div class="sidebar">
      <IconField class="search-worker">
        <InputIcon class="pi pi-search" />
        <InputText v-model="searchWorker" placeholder="Search" />
      </IconField>

      <button class="worker-label" :class="{ 'selected': workerName === selectedWorker}" v-for="workerName in workerNames" @click="selectWorker(workerName)">{{ workerName }}</button>

      <Button class="create-worker" severity="success" label="Create Worker" icon="pi pi-plus" @click="createWorker"></Button>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  height: 100%;
  background-color: #D2D7DF;

  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.search-worker{
  background-color: bisque;
  margin-bottom: 1rem;
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
  padding: 0.5rem;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
