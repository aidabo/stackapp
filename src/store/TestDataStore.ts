import { useDefaultDataStore } from "@/store/DefaultDataStore"

export const useTestDataStore = () =>{

    const store = {...useDefaultDataStore()};

    const origin = store.getDataById;

    const customGetDataById = async(id: string) =>{
        console.log("****This is TestDataStore GetDataById ");
        return await origin(id);
    }

    store.getDataById = customGetDataById;

    return {
        ...store
    }
}