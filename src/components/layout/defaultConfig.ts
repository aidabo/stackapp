import { StackLayoutOptions } from "./StackLayoutConfig";

const defaultConfig = (config?: StackLayoutOptions )=>{
    const options = {
        eventHandler: config?.eventHandler?? "DefaultHandler",
        layoutStore: config?.layoutStore?? "DefaultLayoutStore",
        dataStore:  config?.dataStore?? "DefaultDataStore",
      } as StackLayoutOptions
      
    return { options }
}

export  { defaultConfig }