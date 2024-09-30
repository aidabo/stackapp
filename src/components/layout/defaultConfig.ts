import { GridLayoutOptions } from "./GridLayoutConfig";

const defaultConfig = (config?: GridLayoutOptions )=>{
    const options = {
        eventHandler: config?.eventHandler?? "DefaultHandler",
        layoutStore: config?.layoutStore?? "DefaultLayoutStore",
        dataStore:  config?.dataStore?? "DefaultDataStore",
      } as GridLayoutOptions
      
    return { options }
}

export  { defaultConfig }