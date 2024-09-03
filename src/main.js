import '@/assets/style.css';
import '@/assets/tailwind.css';
import 'nprogress/nprogress.css';

import { createApp,  } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router';
import VeeValidatePlugin from './includes/validation';
import environment from './includes/environment';
import ProgessBar from './includes/progressBar';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import '@arco-design/web-vue/es/icon';
//import formCreate from '@form-create/arco-design'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(ArcoVue);
app.use(VeeValidatePlugin);
app.use(environment);
//app.use(formCreate);

ProgessBar(router);

app.mount('#app');
