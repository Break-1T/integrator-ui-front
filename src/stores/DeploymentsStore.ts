import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ServiceResult } from '@/classes/serviceResult/ServiceResult'
import AxiosHelper from '@/helpers/AxiosHelper'
import { AxiosError } from 'axios'
import type { CreateIntegrationRequest } from '@/models/CreateIntegrationRequest'

export const useDeploymentsStore = defineStore('deploymentsStore', () => {
  const deploymentNames = ref<string[]>([])

  const getDeployments = computed(() => deploymentNames.value)

  function setDeploymentNames(items: string[]) {
    deploymentNames.value = items;
  }

  async function loadDeploymentNamesAsync(): Promise<ServiceResult> {
    const serviceResult = new ServiceResult()

    try {
      const response = await AxiosHelper.instance.get('deployment/get-deployment-names');

      if (response.status !== 200) {
        serviceResult.fromError(`Could not load deployment names. Details: ${response.data}`);
        return serviceResult;
      }

      setDeploymentNames(response.data);
      serviceResult.fromSuccess();
    } catch (ex) {
      let errorMessage = ex instanceof AxiosError
        ? `Could not load deployment names. Status code: ${ex.status}`
        : `Could not load deployment names. Please try again later`;

      serviceResult.fromError(errorMessage);
    }

    return serviceResult
  }

  async function createIntegrationAsync(request: CreateIntegrationRequest): Promise<ServiceResult> {
    const serviceResult = new ServiceResult()

    try {
      const response = await AxiosHelper.instance.post('deployment/create-integration', request);

      if (response.status !== 200) {
        serviceResult.fromError(`Could not create integration. Details: ${response.data}`);
        return serviceResult;
      }

      loadDeploymentNamesAsync();

      serviceResult.fromSuccess();
    } catch (ex) {
      let errorMessage = ex instanceof AxiosError
        ? `Could not create integration. Status code: ${ex.status}`
        : `Could not create integration. Please try again later`;

      serviceResult.fromError(errorMessage);
    }

    return serviceResult
  }

  return {
    getDeployments,

    loadDeploymentNamesAsync,
    createIntegrationAsync
  }
})
