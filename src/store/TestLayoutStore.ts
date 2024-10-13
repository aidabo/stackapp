import { useDefaultLayoutStore } from "@/components/layout/DefaultLayoutStore";

export const useTestLayoutStore = () =>{

    const store = {...useDefaultLayoutStore()};

    const origin = store.getPageById;

    const customGetPageById = async(pageId: string) =>{
        console.log("****This is TestLayoutStore GetPageById ");
        return await origin(pageId);
    }

    store.getPageById = customGetPageById;

    return {
        ...store
    }
}