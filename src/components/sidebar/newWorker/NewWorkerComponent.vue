<template>
  <Dialog header="Create Worker" :visible="visible" :closable="false" modal @hide="$emit('hide')"
    class="create-integration-dialog" :style="{ width: '700px', maxWidth: '90vw', minWidth: '600px' }">
    <div class="form-container">
      <div class="form-field half-width">
        <label for="integrationName">Worker Name</label>
        <InputText id="integrationName" v-model="integrationName" />
      </div>
      <div class="form-field half-width">
        <label for="imageUrl">Image URL</label>
        <InputText id="imageUrl" v-model="imageUrl" />
      </div>
      <div class="form-field half-width">
        <label for="memoryRequest">Memory Request</label>
        <InputText id="memoryRequest" v-model="memoryRequest" />
      </div>
      <div class="form-field half-width">
        <label for="memoryLimit">Memory Limit</label>
        <InputText id="memoryLimit" v-model="memoryLimit" />
      </div>
      <div class="form-field half-width">
        <label for="port">Port</label>
        <InputNumber id="port" v-model="port" :min="0" />
      </div>

      <!-- Worker Settings Config -->
      <div class="form-field full-width">
        <h3>Worker Settings - Config</h3>
        <div v-for="(item, index) in config" :key="index" class="config-item">
          <InputText placeholder="Config Name" v-model="item.name" class="config-input" />
          <InputText placeholder="Config Value" v-model="item.value" class="config-input" />
          <Button icon="pi pi-trash" class="p-button-danger p-button-sm remove-button" @click="removeConfig(index)" />
        </div>
        <Button label="Add Config" icon="pi pi-plus" class="p-button-sm add-button" @click="addConfig" />
      </div>

      <!-- Worker Settings Secret -->
      <div class="form-field full-width">
        <h3>Worker Settings - Secret</h3>
        <div v-for="(item, index) in secret" :key="index" class="secret-item">
          <InputText placeholder="Secret Name" v-model="item.name" class="secret-input" />
          <InputText placeholder="Secret Value" v-model="item.value" class="secret-input" />
          <Button icon="pi pi-trash" class="p-button-danger p-button-sm remove-button" @click="removeSecret(index)" />
        </div>
        <Button label="Add Secret" icon="pi pi-plus" class="p-button-sm add-button" @click="addSecret" />
      </div>
    </div>

    <!-- Footer with Save and Cancel buttons -->
    <template #footer>
      <div class="footer-buttons">
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="$emit('hide')" />
        <Button label="Save" icon="pi pi-check" class="p-button" @click="emitSave" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, toRefs } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { CreateIntegrationRequest } from '@/models/CreateIntegrationRequest';
import { useDeploymentsStore } from '@/stores/DeploymentsStore';
import { useToast } from 'primevue';
import { WorkerSetting } from '@/models/WorkerSetting';

const props = defineProps({
  visible: Boolean
});

const { visible } = toRefs(props);

const deploymentStore = useDeploymentsStore();
const toast = useToast();
const emit = defineEmits(['hide']);

// Используем отдельные ref для каждого поля
const integrationName = ref('');
const imageUrl = ref('');
const memoryRequest = ref('');
const memoryLimit = ref('');
const port = ref(8080);
const config = ref<WorkerSetting[]>([]);
const secret = ref<WorkerSetting[]>([]);

const addConfig = () => {
  config.value.push(new WorkerSetting('', ''));
};

const removeConfig = (index: number) => {
  config.value.splice(index, 1);
};

const addSecret = () => {
  secret.value.push(new WorkerSetting('', ''));
};

const removeSecret = (index: number) => {
  secret.value.splice(index, 1);
};

const emitSave = async () => {
  // Создаем новый экземпляр CreateIntegrationRequest и заполняем его значениями из ref
  const integrationData = new CreateIntegrationRequest();
  integrationData.integrationName = integrationName.value;
  integrationData.imageUrl = imageUrl.value;
  integrationData.memoryRequest = memoryRequest.value;
  integrationData.memoryLimit = memoryLimit.value;
  integrationData.port = port.value;
  integrationData.workerSettings.config = config.value;
  integrationData.workerSettings.secret = secret.value;

  console.log('Saving data:', integrationData); // Debug: проверка данных перед отправкой
  emit('hide');

  let createIntegrationResult = await deploymentStore.createIntegrationAsync(integrationData);
  if (!createIntegrationResult.IsSuccess) {
    toast.add({ severity: 'error', summary: 'Error', detail: createIntegrationResult.ErrorMessage });
  } else {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Integration created successfully.' });
  }
};

// Сброс данных каждый раз при открытии диалога
watch(visible, (newValue) => {
  if (newValue) {
    integrationName.value = '';
    imageUrl.value = '';
    memoryRequest.value = '';
    memoryLimit.value = '';
    port.value = 8080;
    config.value = [];
    secret.value = [];
  }
});
</script>

<style lang="scss" scoped>
.create-integration-dialog {
  .form-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .half-width {
    flex: 1 1 48%;
  }

  .full-width {
    flex: 1 1 100%;
    margin-top: 1rem;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .config-item,
  .secret-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .config-input,
  .secret-input {
    flex: 1;
  }

  .remove-button {
    flex-shrink: 0;
  }

  .add-button {
    margin-top: 0.5rem;
  }

  .footer-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 0.5rem;
  }
}
</style>
