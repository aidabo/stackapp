import { GsEvent } from "@/components/layout/GridEvent";
import { useDefaultHandler } from "@/components/dynamic/handlers/DefaultHandler"

export const useTestHandler = () =>{

    const hs = {...useDefaultHandler()};

    const originSaveHandler = hs.saveHandler;

    hs.saveHandler = (event: GsEvent, callback?: Function) =>{
        console.log("****This is a override save handler");
        originSaveHandler(event, callback)
    }

    return {...hs}
}