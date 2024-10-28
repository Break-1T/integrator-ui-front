/* eslint-disable vue/multi-word-component-names */
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import Divider from 'primevue/divider';

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

app.mount('#app');
