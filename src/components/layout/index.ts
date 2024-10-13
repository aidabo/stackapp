import StackLayout from "./StackLayout.vue";
import StackPage from "./StackPage.vue";
import StackPageCreate from "./StackPageCreate.vue";
import StackMenu from "./StackMenu.vue";
import {
  StackEvent,
  PageProps,
  CompProps,
  ComponentOption,
  StackCompPropsHandlers,
  StackCompProps,
  PageComponent,
  PageResources,
  PageHandler,
  PageStore,
} from "./StackEvent";
import {
  StackLayoutProvider,
  StackConfigLoader,
  createDefaultConfig,
  defaultConfig,
  ConfigLoaderProps,
} from "./StackLayoutConfig";
import { useDefaultDataStore } from "./DefaultDataStore";
import { useDefaultHandler } from "./DefaultHandler";
import { useDefaultLayoutStore } from "./DefaultLayoutStore";

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

export type {
  StackEvent,
  PageProps,
  CompProps,
  ComponentOption,
  StackCompPropsHandlers,
  StackCompProps,
  PageComponent,
  PageResources,
  PageHandler,
  PageStore,
  ConfigLoaderProps,
};

const components = [StackLayout, StackPage, StackPageCreate, StackMenu];

const StackAppLayout = {
  install(App: App) {
    components.forEach((item: any) => {
      App.component(item.name, item);
    });
  },
};

export default StackAppLayout;
