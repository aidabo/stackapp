import { StackEvent, PageProps, CompProps, GridOptions, GridItemOptions, ComponentOption, StackCompPropsHandlers, StackCompProps, PageComponent, PageResources, PageHandler, PageStore, createComponentOption, createPageProps, createStackEvent, createGridOptions, createStackComponentHandlers, createNewGrid, createStackComponentRefs } from "./StackEvent";
import { StackLayoutProvider, StackConfigLoader, createDefaultConfig, defaultConfig, ConfigLoaderProps } from "./StackLayoutConfig";
import { useDefaultDataStore } from "./DefaultDataStore";
import { useDefaultHandler } from "./DefaultHandler";
import { useDefaultLayoutStore } from "./DefaultLayoutStore";
import { App } from "vue";
export { StackLayoutProvider, StackConfigLoader, createDefaultConfig, defaultConfig, useDefaultLayoutStore, useDefaultHandler, useDefaultDataStore, createComponentOption, createPageProps, createStackEvent, createGridOptions, createStackComponentHandlers, createStackComponentRefs, createNewGrid, };
export type { StackEvent, PageProps, CompProps, GridOptions, GridItemOptions, ComponentOption, StackCompPropsHandlers, StackCompProps, PageComponent, PageResources, PageHandler, PageStore, ConfigLoaderProps, };
declare const StackAppLayout: {
    install(App: App): void;
};
export default StackAppLayout;
