<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: auto;

  background-color: var(--p-surface-900);
}

.datatable {
  flex: 1;
  width: 100%;

  .p-datatable-wrapper {
    overflow-x: auto;
  }

  .p-datatable-thead>tr>th,
  .p-datatable-tbody>tr>td {
    white-space: nowrap;
    padding: 0.75rem 1rem;
  }
}
</style>

<template>
  <div class="container">
    <DataTable :value="transformRecords" :loading="tableLoading" class="datatable content-mobile-responsive"
      removableSort scrollable scroll-height="flex" data-key="transformRecordId" filter-display="menu" paginator
      :rows="10" :rowsPerPageOptions="[10, 25, 50, 100]">
      <Column field="recCreated" header="Rec Created" sortable />
      <Column field="recModified" header="Rec Modified" sortable />
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          {{ getStatusString(data) }}
        </template>
      </Column>
      <Column field="transformRecordId" header="Transform Record Id" sortable />
      <Column field="inRecordTransferId" header="In RecordTransfer Id" sortable />
      <Column field="outRecordTransferId" header="Out RecordTransfer Id" sortable />
      <Column field="entityVersion" header="Entity Version" sortable />
      <Column field="sourceId" header="Source Id" sortable />
      <Column field="targetId" header="Target Id" sortable />
      <Column field="recordType" header="Record Type" sortable />
      <Column field="source" header="Source" sortable />
      <Column field="target" header="Target" sortable />
      <Column field="statusMessage" header="Status Message" sortable />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTransformRecordsStore } from '@/stores/TransformRecordsStore';
import { useToast } from 'primevue/usetoast';
import type { TransformRecord } from '@/classes/TransformRecord';
import { TransformRecordsFilters } from '@/classes/TransformRecordsFilters';
import { TransformRecordStatusEnum, TransformRecordStatusText } from '@/enums/TransformRecordStatusEnum';

const props = defineProps({
  workerName: { type: String, required: true }
});

const transformRecords = ref<TransformRecord[]>([]);
const tableLoading = ref(false);
const toast = useToast();
const transfersRecordsStore = useTransformRecordsStore();

const getStatusString = (data: TransformRecord) => {
  return TransformRecordStatusText[data.status as TransformRecordStatusEnum] || "Unknown";
}

const loadRecordTransfers = async () => {
  tableLoading.value = true;
  let filters = new TransformRecordsFilters();
  filters.pageNumber = 1;
  filters.pageSize = 25;
  const loadTRResult = await transfersRecordsStore.getTransformRecordsAsync(props.workerName, filters);

  if (!loadTRResult.IsSuccess) {
    toast.add({ severity: 'error', summary: 'Error', detail: loadTRResult.ErrorMessage });
  } else {
    transformRecords.value = loadTRResult.Result!;
  }

  tableLoading.value = false;
};

onMounted(loadRecordTransfers);
</script>
