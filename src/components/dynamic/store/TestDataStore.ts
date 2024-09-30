import { useDefaultDataStore } from "@/components/dynamic/store/DefaultDataStore"

export const useTestComponentStore = () =>{

    const store = {...useDefaultDataStore()};

    const origin = store.getDataById;

    const customGetDataById = async(id: string) =>{
        console.log("****This is custom GetDataById ");
        return await origin(id);
    }

    store.getDataById = customGetDataById;

    return {
        ...store
    }
}