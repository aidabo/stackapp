import StackLayout from "./StackLayout.vue";
import StackPage from "./StackPage.vue";
import StackPageCreate from "./StackPageCreate.vue";
//import StackItemWrapper from "./StackItemWrapper"
//import StackNaviPanel from "./StackNaviPanel.vue"
import { StackEvent } from "./StackEvent";
import {
  StackLayoutProvider,
  StackConfigLoader,
  createDefaultConfig,
} from "./StackLayoutConfig";
//import * as StackDynamicLoader from "./StackDynamicLoader"
import StackMenu from "./StackMenu.vue";
import * as defaultConfig from "./config/defaultConfig";
import { useDefaultDataStore } from "./config/DefaultDataStore";
import { useDefaultHandler } from "./config/DefaultHandler";
import { useDefaultLayoutStore } from "./config/DefaultLayoutStore";

import { App } from "vue";

export {
  StackLayoutProvider,
  StackConfigLoader,
  createDefaultConfig,
  defaultConfig,
  useDefaultLayoutStore,
  useDefaultHandler,
  useDefaultDataStore,
};

const components = [StackLayout, StackPage, StackPageCreate, StackMenu];

const StackAppLayout = {
  install(App: App) {
    components.forEach((item:any) => {
      App.component(item.name, item);
    });
  },
};

export default StackAppLayout;
