import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ServiceResult } from '@/classes/serviceResult/ServiceResult'
import AxiosHelper from '@/helpers/AxiosHelper'
import { AxiosError } from 'axios'
import { IntegratorJob } from '@/classes/IntegratorJob'

export const useIntegrationsStore = defineStore('integrationsStore', () => {
  const workerJobs = ref<Map<string, IntegratorJob[]>>(new Map<string, IntegratorJob[]>());

  const getWorkerJobs = computed(() => workerJobs.value)

  function setJobs(workerName: string, jobs: IntegratorJob[]) {
    workerJobs.value.set(workerName, jobs);
  }

  async function loadIntegratorJobsAsync(workerName: string): Promise<ServiceResult> {
    const serviceResult = new ServiceResult();

    try {
      const response = await AxiosHelper.instance.get(`proxy/${workerName}/jobs/get-jobs`);

      if (response.status !== 200) {
        serviceResult.fromError(`Could not load jobs for worker ${workerName}. Details: ${response.data}`);
        return serviceResult;
      }

      setJobs(workerName, response.data);
      serviceResult.fromSuccess();
    } catch (ex) {
      let errorMessage = ex instanceof AxiosError
        ? `Could not load deployment names. Status code: ${ex.status}`
        : `Could not load deployment names. Please try again later`;

      serviceResult.fromError(errorMessage);
    }

    return serviceResult
  }

  return {
    getWorkerJobs,

    loadIntegratorJobsAsync
  }
})
