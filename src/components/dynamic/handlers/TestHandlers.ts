import { GsEvent } from "@/components/layout/GridEvent";
import { useDefaultHandlers } from "@/components/dynamic/handlers/DefaultHandler"

export const useTestHandler = () =>{

    const hs = {...useDefaultHandlers()};

    const originSaveHandler = hs.saveHandler;

    hs.saveHandler = (event: GsEvent, callback?: Function) =>{
        console.log("****This is a override save handler");
        originSaveHandler(event, callback)
    }

    return {...hs}
}