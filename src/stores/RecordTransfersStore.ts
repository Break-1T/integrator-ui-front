import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosHelper from '@/helpers/AxiosHelper'
import { AxiosError } from 'axios'
import { RecordTransferFilters } from '@/classes/RecordTransferFilters'
import { RecordTransfer } from '@/classes/RecordTransfer'
import { ServiceObjectResult } from '@/classes/serviceResult/ServiceObjectResult'

export const useRecordTransfersStore = defineStore('recordTransfersStore', () => {
  const recordTransfers = ref<string[]>([]);

  async function getRecordTransfersAsync(workerName: string, filters: RecordTransferFilters): Promise<ServiceObjectResult<RecordTransfer[]>> {
    const serviceResult = new ServiceObjectResult<RecordTransfer[]>()

    try {
      const response = await AxiosHelper.instance.post(`proxy/${workerName}/recordtransfer/get-record-transfers`, filters);

      if (response.status !== 200) {
        serviceResult.fromError(`Could not load recordTransfers. Details: ${response.data}`);
        return serviceResult;
      }

      serviceResult.fromSuccess(response.data);
    } catch (ex) {
      let errorMessage = ex instanceof AxiosError
        ? `Could not load recordTransfers. Status code: ${ex.status}`
        : `Could not load recordTransfers. Please try again later`;

      serviceResult.fromError(errorMessage);
    }

    return serviceResult
  }

  return {
    getRecordTransfersAsync
  }
})
