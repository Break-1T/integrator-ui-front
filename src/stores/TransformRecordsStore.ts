import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosHelper from '@/helpers/AxiosHelper'
import { AxiosError } from 'axios'
import { RecordTransfer } from '@/classes/RecordTransfer'
import { ServiceObjectResult } from '@/classes/serviceResult/ServiceObjectResult'
import type { TransformRecordsFilters } from '@/classes/TransformRecordsFilters'
import type { TransformRecord } from '@/classes/TransformRecord'

export const useTransformRecordsStore = defineStore('transformRecordsStore', () => {
  const transformRecords = ref<string[]>([]);

  async function getRecordTransfersAsync(workerName: string, filters: TransformRecordsFilters): Promise<ServiceObjectResult<TransformRecord[]>> {
    const serviceResult = new ServiceObjectResult<TransformRecord[]>()

    try {
      const response = await AxiosHelper.instance.post(`proxy/${workerName}/transformrecord/get-record-transfers`, filters);

      if (response.status !== 200) {
        serviceResult.fromError(`Could not load transform records. Details: ${response.data}`);
        return serviceResult;
      }

      serviceResult.fromSuccess(response.data);
    } catch (ex) {
      let errorMessage = ex instanceof AxiosError
        ? `Could not load transform records. Status code: ${ex.status}`
        : `Could not load transform records. Please try again later`;

      serviceResult.fromError(errorMessage);
    }

    return serviceResult
  }

  return {
    getRecordTransfersAsync
  }
})
