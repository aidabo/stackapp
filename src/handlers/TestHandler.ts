import { StackEvent } from "@/components/layout/StackEvent";
import { useDefaultHandler } from "@/components/layout/DefaultHandler";

export const useTestHandler = () =>{

    const hs = {...useDefaultHandler()};

    const originSave = hs.gsSave;

    hs.gsSave = (event: StackEvent, callback?: Function) =>{
        console.log("****This is a override save handler");
        originSave(event, callback)
    }

    return {...hs}
}