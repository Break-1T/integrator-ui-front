<template>
  <BlockUI :blocked="blocked">
    <Panel v-for="(items, groupName) in groupedJobs" :key="groupName" :header="groupName || 'No Group'" toggleable>
      <DataTable :value="items" class="job-table">
        <Column field="jobName" header="Job Name"></Column>
        <Column field="jobGroup" header="Job Group"></Column>
        <Column field="cronSchedule" header="Cron Schedule"></Column>
        <Column header="Settings">
          <template #body="slotProps">
            <Button label="View Settings" icon="pi pi-eye" class="p-button-text"
                    @click="showSettings(slotProps.data.settings)" />
          </template>
        </Column>
      </DataTable>
      
      <Dialog header="Job Settings" v-model:visible="dialogVisible" modal class="settings-dialog">
        <div v-if="currentSettings && Object.keys(currentSettings).length > 0" class="settings-list">
          <div class="setting-item" v-for="(value, key) in currentSettings" :key="key">
            <strong class="setting-key">{{ key }}:</strong>
            <span class="setting-value">{{ value }}</span>
          </div>
        </div>
        <div v-else>
          <p><em>No settings available</em></p>
        </div>
      </Dialog>
    </Panel>
  </BlockUI>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrayHelper } from '@/helpers/ArrayHelper';
import { useIntegrationsStore } from '@/stores/IntegrationsStore';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  workerName: { type: String, required: true }
});

const toast = useToast();
const integrationStore = useIntegrationsStore();

const blocked = ref(false); 
const dialogVisible = ref(false);
const currentSettings = ref<Record<string, any> | null>(null);

const groupedJobs = computed(() => {
  let jobs = integrationStore.getWorkerJobs.get(props.workerName) ?? [];
  return ArrayHelper.groupBy(jobs, x => x.jobGroup ?? 'Not_Groupped');
});

const showSettings = (settings: Record<string, any>) => {
  currentSettings.value = settings;
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const loadJobsAsync = async () => {
  blocked.value = true;
  const loadJobsResult = await integrationStore.loadIntegratorJobsAsync(props.workerName);

  if (!loadJobsResult.IsSuccess) {
    toast.add({ severity: 'error', summary: 'Error', detail: loadJobsResult.ErrorMessage });
  }

  blocked.value = false;
};

loadJobsAsync();
</script>

<style lang="scss" scoped>
.job-table {
  margin-top: 1em;

  .p-datatable-thead > tr > th {
    background-color: #f1f1f1;
    color: #333;
    font-weight: bold;
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    padding: 0.5em;
    color: #555;
    vertical-align: top;
  }

  em {
    color: #888;
  }
}

.settings-dialog {
  max-width: 600px;

  .settings-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    padding: 1em 0;
  }

  .setting-item {
    flex: 1 1 calc(50% - 1em); /* Два столбца */
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    border-radius: 5px;
    background-color: #f5f5f5;

    .setting-key {
      font-weight: bold;
      color: #444;
    }

    .setting-value {
      color: #333;
    }
  }

  em {
    color: #888;
  }
}
</style>
