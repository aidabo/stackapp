import { GsEvent } from "@/components/layout/GridEvent";
import { useDefaultHandler } from "@/handlers/DefaultHandler";

export const useTestHandler = () =>{

    const hs = {...useDefaultHandler()};

    const originSave = hs.gsSave;

    hs.gsSave = (event: GsEvent, callback?: Function) =>{
        console.log("****This is a override save handler");
        originSave(event, callback)
    }

    return {...hs}
}