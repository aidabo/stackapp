import { defaultConfig } from "@/components/layout/defaultConfig"
import { defineComponent, SetupContext, provide } from "vue";
import { h } from "vue";

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
export interface GridLayoutOptions {
  eventHandler: string;
  layoutStore:  string;
  dataStore:    string;
}

// const createConfig = (opts?: any): GridLayoutOptions => {  
//   return {
//     eventHandler: opts?.eventHandler ?? "DefaultHandler",
//     layoutStore: opts?.layoutStore ?? "DefaultLayoutStore",
//     dataStore: opts?.dataStore ?? "DefaultDataStore",
//   } as GridLayoutOptions;
// };

/**
 * A composable to provide a given configuration to all children.
 * @param config - A FormKit configuration object or a function
 */
export function useConfig(
  config?: GridLayoutOptions | ((...args: any[]) => GridLayoutOptions)
) {
  const options = Object.assign(
    {
      alias: "GridLayoutConfig",
    },
    typeof config === "function" ? config() : config
  ) as any;

  console.log("***options", options);

  /**
   * The root configuration options.
   */
  const rootConfig = (defaultConfig(options.config || {}) as any).options;

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

export interface GridLayoutProviderProps {
  config?: GridLayoutOptions | ((...args: any[]) => GridLayoutOptions);
}

export const GridLayoutProvider = /* #__PURE__ */ defineComponent(
  function GridLayoutProvider<
    P extends GridLayoutProviderProps,
    S extends { default: GridLayoutOptions }
  >(props: P, { slots, attrs }: SetupContext<S>) {
    const options: GridLayoutOptions = {} as any;

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
  { props: ["config"], name: "GridLayoutProvider", inheritAttrs: false }
);

export interface ConfigLoaderProps {
  defaultConfig?: boolean;
  configFile?: string;
}

export const GridConfigLoader = /* #__PURE__ */ defineComponent(
  async function GridConfigLoader(props: ConfigLoaderProps, context) {
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
      const { defaultConfig } = await import("./defaultConfig");
      config = /* @__PURE__ */ defaultConfig(config as any).options;
    }
    console.log("now config", config);
    /* @__default-config__ */
    return () =>
      h(GridLayoutProvider, { ...context.attrs, config }, context.slots);
  },
  {
    props: ["defaultConfig", "configFile"],
    inheritAttrs: false,
  }
);
