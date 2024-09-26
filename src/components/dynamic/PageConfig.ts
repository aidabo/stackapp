import { useDefaultLayoutStore } from "./store/DefaultLayoutStore";

export const definePageConfig = {
    eventHandler: "TestHandler",
    dataStore: "defaultComponentStore",
    layoutStore: "defaultLayoutStore",  
    components: "PageComponents"  
}