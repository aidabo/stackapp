import { StackEvent } from "./StackEvent";
/**
 * Handler function will be injected into component's props.
 * Keep following function name. Other functions exported
 * will also injected as gsOptions in props
 *
 * File name and export name rule: exported name with prefix "use"
 *
 * filename: myFileName.ts
 * export name useMyFileName
 *
 * @param gsLoad
 * @param gsSave
 * @param gsItemChanged
 * @param gsDelete
 * @param gsUpload
 * @param gsDownload
 * @param gsAny
 * @returns
 */
export declare const useDefaultHandler: (gsLoad?: (event: StackEvent, callback?: Function) => any, gsSave?: (event: StackEvent, callback?: Function) => any, gsItemChanged?: (event: StackEvent, callback?: Function) => any, gsDelete?: (event: StackEvent, callback?: Function) => any, gsUpload?: (event: StackEvent, callback?: Function) => any, gsDownload?: (event: StackEvent, callback?: Function) => any, gsAny?: (event: StackEvent, callback?: Function) => any) => {
    gsLoad: (event: StackEvent, callback?: Function) => any;
    gsSave: (event: StackEvent, callback?: Function) => any;
    gsItemChanged: (event: StackEvent, callback?: Function) => any;
    gsDelete: (event: StackEvent, callback?: Function) => any;
    gsUpload: (event: StackEvent, callback?: Function) => any;
    gsDownload: (event: StackEvent, callback?: Function) => any;
    gsAny: (event: StackEvent, callback?: Function) => any;
    gsInvoke: (fn: string, event: StackEvent, callback?: Function) => Promise<any>;
    fns: {
        invoke: (fn: string, event: StackEvent, callback?: Function) => any;
    };
};
