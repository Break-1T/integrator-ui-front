<style lang="scss" scoped>
  .container{
    // width: 100% !important;
    // height: 100% !important;
  }

  .datatable{
    // height: 100%;
  }
</style>

<template>
  <div class="container">
    <DataTable :value="transformRecords" :loading="tableLoading"
               class="datatable content-mobile-responsive"
               removableSort scrollable scroll-height="flex"
               data-key="transformRecordId" filter-display="menu"
               paginator :rows="10" :rowsPerPageOptions="[10, 25, 50, 100]">
      <Column field="recCreated" header="Rec Created" sortable/>
      <Column field="recModified" header="Rec Modified" sortable/>
      <Column field="status" header="Status" sortable/>
      <Column field="transformRecordId" header="RecordTransfer Id" sortable/>
      <Column field="inRecordTransferId" header="In RecordTransfer Id" sortable/>
      <Column field="outRecordTransferId" header="Out RecordTransfer Id" sortable/>
      <Column field="entityVersion" header="Entity Version" sortable/>
      <Column field="sourceId" header="Source Id" sortable/>
      <Column field="targetId" header="Target Id" sortable/>
      <Column field="recordType" header="Record Type" sortable/>
      <Column field="source" header="Source" sortable/>
      <Column field="target" header="target" sortable/>
      <Column field="statusMessage" header="Status Message" sortable/>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { TransformRecord } from '@/classes/TransformRecord';
import { TransformRecordsFilters } from '@/classes/TransformRecordsFilters';
import { useTransformRecordsStore } from '@/stores/TransformRecordsStore';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const props = defineProps({
  workerName: { type: String, required: true}
});

const recordTransfersStore = useTransformRecordsStore();
const toast = useToast();

const transformRecords = ref<TransformRecord[]>([]);
const tableLoading = ref(false);
const loadRecordTransfers = async () =>{
  tableLoading.value = true;
  let loadTRResult = await recordTransfersStore.getRecordTransfersAsync(props.workerName, new TransformRecordsFilters());

  if (!loadTRResult.IsSuccess) {
    toast.add({ severity: 'error', summary: 'Error', detail: loadTRResult.ErrorMessage });
    tableLoading.value = false;
    return;
  }

  transformRecords.value = loadTRResult.Result!;

  tableLoading.value = false;
}

onMounted(async () =>{
  await loadRecordTransfers();
});

</script>
