import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useRouterStore = defineStore('routerStore', () => {
  const router = useRouter()

  const selectedWorker = ref<string | null>(null);

  const getSelectedWorker = computed(() => selectedWorker.value)

  function setSelectedWorker(workerName: string) {
    selectedWorker.value = workerName;
  }

  return {
    getSelectedWorker,

    setSelectedWorker
  }
})
