import { PropType } from "vue";

export interface CData {
    id: string,
    name: string,    
}

export interface ComponentBProps{
    id: string,
    name: string,
    description?: string,
    data: {[key: string]: any},    
    storeUrl?: string;
}
