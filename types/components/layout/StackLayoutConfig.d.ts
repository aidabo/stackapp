import { PageResources } from "./StackEvent";
export declare const defaultConfig: (config?: StackLayoutOptions) => {
    options: StackLayoutOptions;
};
/**
 * Inject event name
 */
export declare const eventSymbol: {
    gsPageHandler: string;
    gsPageConfigOptions: string;
    gsPageConfig: string;
};
/**
 * Specify custom event handler, page store, component store
 */
export interface StackLayoutOptions {
    layoutStore: string | any;
    eventHandler: string | any;
    dataStore: string | any;
    resources: PageResources | undefined;
}
/**
 * Default config for page handler, layout store and data store
 *
 * @param config
 * @returns
 */
export declare const createDefaultConfig: (config?: StackLayoutOptions) => {
    options: StackLayoutOptions;
};
export interface StackLayoutProviderProps {
    config?: StackLayoutOptions | ((...args: any[]) => StackLayoutOptions);
}
export declare const StackLayoutProvider: import("vue").DefineSetupFnComponent<{
    config: any;
}, {}, {}, {
    config: any;
} & {}, import("vue").PublicProps>;
export interface ConfigLoaderProps {
    defaultConfig?: boolean;
    configFile?: string;
}
export declare const StackConfigLoader: import("vue").DefineSetupFnComponent<ConfigLoaderProps, {}, {}, ConfigLoaderProps & {}, import("vue").PublicProps>;
