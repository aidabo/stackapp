
import { defineComponent, SetupContext, provide } from "vue";
import { h, reactive } from "vue";
import { PageResources, PageStore, PageHandler } from "@/components/layout/StackEvent";
import { useDefaultDataStore } from "./config/DefaultDataStore";
import { useDefaultLayoutStore } from "./config/DefaultLayoutStore";
import { useDefaultHandler } from "./config/DefaultHandler";
/**
 * Inject event name
 */
export const eventSymbol = {
  gsPageHandler: "__gs_page_handler",
  gsPageConfigOptions: "__gs_page_config_options__",
  gsPageConfig: "__gs_page_config__",
};

/**
 * Specify custom event handler, page store, component store
 */
export interface StackLayoutOptions {
  layoutStore:  string | any;
  eventHandler: string | any;
  dataStore:    string | any;
  resources:    PageResources | undefined;
}

/**
 * Default config for page handler, layout store and data store
 * 
 * @param config 
 * @returns 
 */
export const createDefaultConfig = (config?: StackLayoutOptions )=>{
  const options = {
      layoutStore: config?.layoutStore?? "DefaultLayoutStore",
      eventHandler: config?.eventHandler?? "DefaultHandler",
      dataStore:  config?.dataStore?? "DefaultDataStore",
      resources: config?.resources?? {
          handlers: reactive<PageHandler[]>([
            {
                  name: "DefaultHandler",
                  handler: useDefaultHandler,
            },
          ]),
          stores: reactive<PageStore[]>([
            {
                  name: "DefaultDataStore",
                  store: useDefaultDataStore,
            },          
            {
                  name: "DefaultLayoutStore",
                  store: useDefaultLayoutStore,
            },
          ])
        }      
    } as StackLayoutOptions
    
  return { options }
}

/**
 * A composable to provide a given configuration to all children.
 * @param config - A FormKit configuration object or a function
 */
function useConfig(
  config?: StackLayoutOptions | ((...args: any[]) => StackLayoutOptions)
) {
  const options = Object.assign(
    {
      alias: "StackLayoutConfig",
    },
    typeof config === "function" ? config() : config
  ) as any;

  console.log("***options", options);

  /**
   * The root configuration options.
   */
  const rootConfig = (createDefaultConfig(options.config || {}) as any).options;

  /**
   * We dont want to explicitly provide any "config" options, only a root
   * config option — so here we override the existing config options.
   */
  options.config = { rootConfig };

  /**
   * Provide the config to children.
   */
  provide(eventSymbol.gsPageConfigOptions, options);

  /**
   * Provide the root config to the children.
   */
  provide(eventSymbol.gsPageConfig, rootConfig);
}

export interface StackLayoutProviderProps {
  config?: StackLayoutOptions | ((...args: any[]) => StackLayoutOptions);
}

export const StackLayoutProvider = /* #__PURE__ */ defineComponent(
  function StackLayoutProvider<
    P extends StackLayoutProviderProps,
    S extends { default: StackLayoutOptions }
  >(props: P, { slots, attrs }: SetupContext<S>) {
    const options: StackLayoutOptions = {} as any;

    if (props.config) {
      useConfig(props.config);
    }

    return () =>
      slots.default
        ? slots.default(options).map((vnode) => {
            return h(vnode, {
              ...attrs,
              ...vnode.props,
            });
          })
        : null;
  },
  { props: ["config"], name: "StackLayoutProvider", inheritAttrs: false }
);

export interface ConfigLoaderProps {
  defaultConfig?: boolean;
  configFile?: string;
}

export const StackConfigLoader = /* #__PURE__ */ defineComponent(
  async function StackConfigLoader(props: ConfigLoaderProps, context) {
    let config = {};
    if (props.configFile) {
      const configFile = await import(
        /*@__stack.config.ts__*/ /* @vite-ignore */ /* webpackIgnore: true */ props.configFile
      );
      config = "default" in configFile ? configFile.default : configFile;
    }
    console.log("config", config);

    // Ensure this a factory function for runtimeConfig in nuxt.
    if (typeof config === "function") {
      config = config();
    }
    /* @__default-config__ */
    const useDefaultConfig = props.defaultConfig ?? true;
    if (useDefaultConfig) {
      const { defaultConfig } = await import("./config/defaultConfig");
      config = /* @__PURE__ */ defaultConfig(config as any).options;
    }
    console.log("now config", config);
    /* @__default-config__ */
    return () =>
      h(StackLayoutProvider, { ...context.attrs, config }, context.slots);
  },
  {
    props: ["defaultConfig", "configFile"],
    inheritAttrs: false,
  }
);

