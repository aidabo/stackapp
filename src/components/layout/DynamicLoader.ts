import { GridLayoutOptions } from "./GridLayoutConfig";
import camelcase from "camelcase";

export function useDynamicLoader() {

  const importPath = {
    handler: "../dynamic/handlers",
    store: "../dynamic/store",
    component: "../dynamic/component",
  };

  async function loadModule(path: string, jsName: string, ext = "ts") {
    try {
      const module: any = await import(`${path}/${jsName}.${ext}`);
      console.log("load module: ", module);
      if (module.default) {
        return module.default;
      } else {
        return module;
      }
    } catch (error) {
      console.error(`Failed to load module: ${path}/${jsName}`, error);
      return false;
    }
  }

  const importHandler = async (config: GridLayoutOptions) => {
    if (config) {
      const functionName = camelcase(`use_${config.eventHandler}`);
      const module = await loadModule(importPath.handler, config.eventHandler);
      if (module !== false){
        if(functionName in module) {
          const handler = module[functionName];
          return handler;
        }else{
          console.warn(`Not found handler ${functionName} in ${config.eventHandler}.ts`);        
        }
      }
    }
    return false;
  };

  const importDataStore = async (config: GridLayoutOptions) => {
    if (config) {
      const functionName = camelcase(`use_${config.dataStore}`);
      const module = await loadModule(importPath.store, config.dataStore);
      if (module !== false){
        if(functionName in module) {
          const store = module[functionName];          
          return store;
        }else{
          console.warn(`Not found data store ${functionName} in ${config.dataStore}.ts`)
        }
      }
    }
    return false;
  };

  const importLayoutStore = async (config: GridLayoutOptions) => {
    if (config) {
      const functionName = camelcase(`use_${config.layoutStore}`);
      const module = await loadModule(importPath.store, config.layoutStore);
      if (module !== false){
        if(functionName in module) {
          const store = module[functionName];
          return store;
        }else{
          console.warn(`Not found layout store ${functionName} in ${config.layoutStore}.ts`)
        }
      }
    }
    return false;
  };

  const importComponent = async (componentName: string) => {
    const module = await loadModule(importPath.component, componentName);
    if (module === false) {
      console.warn(`Not found component ${componentName}.ts file`);
      return false;
    }
    if("component" in module && "props" in module){
        return [module["component"], module["props"]];
    }else{
        console.warn(`No function component or props in ${componentName}.ts file`);
        return false;
    }
  };

  const importConfiged = async (config: GridLayoutOptions): Promise<GridLayoutOptions> => {
    return {
      eventHandler: await importHandler(config),
      layoutStore: await importLayoutStore(config),
      dataStore: await importDataStore(config),
    } as GridLayoutOptions;
  };

  return { importLayoutStore, importHandler, importComponent, loadModule, importDataStore,  importConfiged,  };
}
