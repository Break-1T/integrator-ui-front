<style lang="scss" scoped>
.container {
  width: 100% !important;
  height: 100% !important;

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
      <Column field="target" header="target" sortable />
      <Column field="status" header="Status" sortable />
      <Column field="statusMessage" header="Status Message" sortable />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { RecordTransfer } from '@/classes/RecordTransfer';
import { RecordTransferFilters } from '@/classes/RecordTransferFilters';
import { useRecordTransfersStore } from '@/stores/RecordTransfersStore';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, toRefs, watch } from 'vue';

const props = defineProps({
  workerName: { type: String, required: true }
});

const { workerName } = toRefs(props);

const recordTransfersStore = useRecordTransfersStore();
const toast = useToast();

const recordTransfers = ref<RecordTransfer[]>([]);
const tableLoading = ref(false);
const loadRecordTransfers = async () => {
  tableLoading.value = true;
  let loadRTResult = await recordTransfersStore.getRecordTransfersAsync(props.workerName, new RecordTransferFilters());

  if (!loadRTResult.IsSuccess) {
    toast.add({ severity: 'error', summary: 'Error', detail: loadRTResult.ErrorMessage });
    tableLoading.value = false;
    return;
  }

  recordTransfers.value = loadRTResult.Result!;

  tableLoading.value = false;
}

watch(workerName, async () => {
  await loadRecordTransfers();
})

// loadRecordTransfers();

</script>
