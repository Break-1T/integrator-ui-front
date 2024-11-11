<template>
    <Dialog 
      header="Create Integration" 
      :visible="visible" 
      modal 
      @hide="$emit('hide')" 
      class="create-integration-dialog" 
      :style="{ width: '700px', maxWidth: '90vw', minWidth: '600px' }"
    >
      <div class="form-container">
        <div class="form-field half-width">
          <label for="integrationName">Integration Name</label>
          <InputText id="integrationName" v-model="integrationData.integrationName" />
        </div>
        <div class="form-field half-width">
          <label for="imageUrl">Image URL</label>
          <InputText id="imageUrl" v-model="integrationData.imageUrl" />
        </div>
        <div class="form-field half-width">
          <label for="memoryRequest">Memory Request</label>
          <InputText id="memoryRequest" v-model="integrationData.memoryRequest" />
        </div>
        <div class="form-field half-width">
          <label for="memoryLimit">Memory Limit</label>
          <InputText id="memoryLimit" v-model="integrationData.memoryLimit" />
        </div>
        <div class="form-field half-width">
          <label for="port">Port</label>
          <InputNumber id="port" v-model="integrationData.port" :min="0" />
        </div>
  
        <!-- Worker Settings Config -->
        <div class="form-field full-width">
          <h3>Worker Settings - Config</h3>
          <DataTable :value="integrationData.workerSettings.config" class="config-table" editMode="cell" @cell-edit-complete="onCellEditComplete">
            <Column field="name" header="Name">
              <template #editor="{ data, field }">
                <InputText ref="lastConfigName" v-model="data[field]" class="editable-cell" />
              </template>
            </Column>
            <Column field="value" header="Value">
              <template #editor="{ data, field }">
                <InputText ref="lastConfigValue" v-model="data[field]" class="editable-cell" />
              </template>
            </Column>
          </DataTable>
          <Button label="Add Config" icon="pi pi-plus" class="p-button-sm add-button" @click="addConfig" />
        </div>
  
        <!-- Worker Settings Secret -->
        <div class="form-field full-width">
          <h3>Worker Settings - Secret</h3>
          <DataTable :value="integrationData.workerSettings.secret" class="secret-table" editMode="cell" @cell-edit-complete="onCellEditComplete">
            <Column field="name" header="Name">
              <template #editor="{ data, field }">
                <InputText ref="lastSecretName" v-model="data[field]" class="editable-cell" />
              </template>
            </Column>
            <Column field="value" header="Value">
              <template #editor="{ data, field }">
                <InputText ref="lastSecretValue" v-model="data[field]" class="editable-cell" />
              </template>
            </Column>
          </DataTable>
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
  import { ref, reactive, defineEmits } from 'vue';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import Button from 'primevue/button';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  
  const emit = defineEmits(['hide', 'save']);
  
  const props = defineProps({
    visible: Boolean,
  });
  
  const integrationData = reactive({
    integrationName: '',
    imageUrl: '',
    memoryRequest: '',
    memoryLimit: '',
    port: 8080,
    workerSettings: {
      config: [
        { name: '', value: '' },
      ],
      secret: [
        { name: '', value: '' },
      ],
    },
  });
  
  const lastConfigName = ref(null);
  const lastConfigValue = ref(null);
  const lastSecretName = ref(null);
  const lastSecretValue = ref(null);
  
  const addConfig = () => {
    integrationData.workerSettings.config.push({ name: '', value: '' });
    setTimeout(() => {
      if (lastConfigName.value) lastConfigName.value.focus();
    }, 0);
  };
  
  const addSecret = () => {
    integrationData.workerSettings.secret.push({ name: '', value: '' });
    setTimeout(() => {
      if (lastSecretName.value) lastSecretName.value.focus();
    }, 0);
  };
  
  const onCellEditComplete = (event) => {
    const { rowData, field, newValue } = event;
    rowData[field] = newValue;
  };
  
  const emitSave = () => {
    emit('save', integrationData);
  };
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
  
    .config-table, .secret-table {
      margin-top: 0.5rem;
      width: 100%;
      min-width: 400px;
    }
  
    .editable-cell {
      border: 1px solid #007ad9;
      border-radius: 4px;
      padding: 0.5rem;
      background-color: #e6f7ff;
      width: 100%;
      box-sizing: border-box;
      transition: background-color 0.2s, border-color 0.2s;
  
      &:hover {
        background-color: #cceeff;
      }
  
      &:focus {
        background-color: #ffffff;
        border-color: #005bb5;
      }
    }
  
    .p-datatable-tbody > tr > td {
      padding: 0.5rem;
      background-color: #fafafa;
      border: 1px solid #ddd;
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
  