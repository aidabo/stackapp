import { useDefaultComponentStore } from "@/components/dynamic/store/DefaultComponentStore"

export const useTestComponentStore = () =>{

    const store = {...useDefaultComponentStore()};

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