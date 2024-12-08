<style lang="scss" scoped>
.container {
  width: 100% !important;
  height: 100% !important;

  background-color: var(--p-surface-900);

  overflow: auto;
}

.datatable {
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="container">
    <DataTable :value="recordTransfers" :loading="tableLoading" class="datatable content-mobile-responsive"
      removableSort scrollable scroll-height="flex" data-key="recordTransferId" filter-display="menu" paginator
      :rows="10" :rowsPerPageOptions="[10, 25, 50, 100]">
      <Column field="recCreated" header="Rec Created" sortable />
      <Column field="recModified" header="Rec Modified" sortable />
      <Column field="recordTransferId" header="RecordTransfer Id" sortable />
      <Column field="sourceId" header="Source Id" sortable />
      <Column field="targetId" header="Target Id" sortable />
      <Column field="recordType" header="Record Type" sortable />
      <Column field="source" header="Source" sortable />
      <Column field="target" header="Target" sortable />
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          {{ getStatusString(data) }}
        </template>
      </Column>
      <Column field="statusMessage" header="Status Message" sortable />
    </DataTable>
  </div>
</template>


<script setup lang="ts">
import type { RecordTransfer } from '@/classes/RecordTransfer';
import { RecordTransferFilters } from '@/classes/RecordTransferFilters';
import { RecordTransferStatusEnum, RecordTransferStatusText } from '@/enums/RecordTransferStatusEnum';
import { useRecordTransfersStore } from '@/stores/RecordTransfersStore';
import { useToast } from 'primevue/usetoast';
import { ref, toRefs } from 'vue';

const props = defineProps({
  workerName: { type: String, required: true }
});

const { workerName } = toRefs(props);
const recordTransfersStore = useRecordTransfersStore();
const toast = useToast();

const recordTransfers = ref<RecordTransfer[]>([]);
const tableLoading = ref(false);

const getStatusString = (data: RecordTransfer) => {
  return RecordTransferStatusText[data.status as RecordTransferStatusEnum] || "Unknown";
}

const loadRecordTransfers = async () => {
  tableLoading.value = true;
  let filters = new RecordTransferFilters();
  filters.pageSize = 20;
  filters.pageNumber = 1;
  let loadRTResult = await recordTransfersStore.getRecordTransfersAsync(workerName.value, filters);

  if (!loadRTResult.IsSuccess) {
    toast.add({ severity: 'error', summary: 'Error', detail: loadRTResult.ErrorMessage });
    tableLoading.value = false;
    return;
  }

  recordTransfers.value = loadRTResult.Result!;

  tableLoading.value = false;
}

loadRecordTransfers();
</script>
