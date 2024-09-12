import '@/assets/style.css';
import '@/assets/tailwind.css';
import 'nprogress/nprogress.css';

import { createApp,  } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router';
import { environment } from './common/environment';
import Progessbar from './common/progressbar';

// DON'T use FormKit global register, can not dynamically resolve
// 
// import { plugin, defaultConfig } from '@formkit/vue'
// import  config from '../formkit.config'

//arco package
import ArcoVue, { Form } from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import '@arco-design/web-vue/es/icon';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
//app.use(plugin, defaultConfig(config));
app.use(ArcoVue);
app.use(environment);
Progessbar(router);

app.mount('#app');

