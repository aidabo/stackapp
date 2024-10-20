import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import "@/assets/tailwind.css";
import { StackEvent, PageProps, CompProps, GridOptions, GridItemOptions, ComponentOption, StackCompPropsHandlers, StackCompProps, PageComponent, PageResources, PageHandler, PageStore, createComponentOption, createPageProps, createStackEvent, createGridOptions, createStackComponentHandlers, createNewGrid, createStackComponentRefs } from "./StackEvent";
import { StackLayoutProvider, StackConfigLoader, createDefaultConfig, defaultConfig, ConfigLoaderProps } from "./StackLayoutConfig";
import { useDefaultDataStore } from "./DefaultDataStore";
import { useDefaultHandler } from "./DefaultHandler";
import { useDefaultLayoutStore } from "./DefaultLayoutStore";
import { App } from "vue";
export { StackLayoutProvider, StackConfigLoader, createDefaultConfig, defaultConfig, useDefaultLayoutStore, useDefaultHandler, useDefaultDataStore, createComponentOption, createPageProps, createStackEvent, createGridOptions, createStackComponentHandlers, createStackComponentRefs, createNewGrid, };
export type { StackEvent, PageProps, CompProps, GridOptions, GridItemOptions, ComponentOption, StackCompPropsHandlers, StackCompProps, PageComponent, PageResources, PageHandler, PageStore, ConfigLoaderProps, };
declare const stackapp: {
    install(app: App): void;
};
export default stackapp;
