/* eslint-disable vue/multi-word-component-names */
import './assets/talwind.css';
import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import Divider from 'primevue/divider';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import BlockUI from 'primevue/blockui';
import DataView from 'primevue/dataview';
import Dialog from 'primevue/dialog';

const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: 'none'
});

app.use(ToastService);

app.component('Drawer', Drawer);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputIcon', InputIcon);
app.component('IconField', IconField);
app.component('Divider', Divider);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('Tag', Tag);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Panel', Panel);
app.component('BlockUI', BlockUI);
app.component('DataView', DataView);
app.component('Dialog', Dialog);
app.component('Toast', Toast);

app.mount('#app');
