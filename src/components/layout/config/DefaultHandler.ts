import { reactive } from "vue";
import { useDefaultDataStore } from "@/components/layout/config/DefaultDataStore";
import { StackEvent } from "@/components/layout/StackEvent";

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
export const useDefaultHandler = (
  gsLoad?: (event: StackEvent, callback?: Function) => any,
  gsSave?: (event: StackEvent, callback?: Function) => any,
  gsItemChanged?: (event: StackEvent, callback?: Function) => any,
  gsDelete?: (event: StackEvent, callback?: Function) => any,
  gsUpload?: (event: StackEvent, callback?: Function) => any,
  gsDownload?: (event: StackEvent, callback?: Function) => any,
  gsAny?: (event: StackEvent, callback?: Function) => any
) => {

 
  const fns = reactive({
    invoke: (fn: string, event: StackEvent, callback?: Function):any => {},
  })

  const { getDataById, getDataByName, getDataByCid, getDataList, saveData, deleteData  } = useDefaultDataStore()
 
  /**
   * Callback provided by parent to load data
   * @param event
   */
  const customGsLoad =
    gsLoad ||
    (async(event: StackEvent, callback?: Function) => {
      
      console.log("default loadHandler event called", event.data);
      
      if(event.data.id){
        const result = await getDataById(event.data.id);
        if(callback){
          callback(result);
        }
      }
    });

  /**
   * Callback provided by parent to save data to store
   * @param event
   */
  const customGsSave =
    gsSave ||
    (async(event: StackEvent, callback?: any) => {
      
      console.log("default saveHandler event called", event.data);

        event.data["cname"] = event.source?.cname;
        event.data["aliasName"] = event.source?.aliasName;
        const result = await saveData(event.data, event.srcId)
        if(callback){
            callback(result);
        }
    });

  /**
   * emited by StackComponent when data changed
   * @param event
   */
  const customGsItemChanged =
    gsItemChanged ||
    (async(event: StackEvent, callback?: Function) => {
      console.log("default itemChangedHandler event received: ", event.srcId, event.data);
      if(callback){
        callback(true)
      }
    });

  const customGsDelete =
    gsDelete ||
    (async(event: StackEvent, callback?: Function) => {
      console.log("default deleteHandler event called", event.data);
      const result = await deleteData(event.data.id);
      if(callback){
        callback(result);
      }
    });

  const customGsUpload =
    gsUpload ||
    ((event: StackEvent, callback?: Function) => {
      console.log("default uploadHandler event called", event.data);
      //TODO
      if(callback){
        callback(true)
      }
    });

    const customGsDownload =
    gsDownload ||
    ((event: StackEvent, callback?: Function) => {
      console.log("default uploadHandler event called", event.data);
      //TODO
      if(callback){
        callback(true)
      }
    });

  const customGsAny =
    gsAny ||
    ((event: StackEvent, callback?: Function) => {
      console.log("default optionHandler event called", event.data);
      //TODO
      if(callback){
        callback(true);
      }
    });

  /**
   * 
   * @param fn 
   * @param event 
   * @param callback 
   * @returns 
   */
  const gsInvoke = async (
    fn: string,
    event: StackEvent,
    callback?: Function
  ) => {
    if(fns.invoke){
      return await fns.invoke(fn, event, callback) as any;
    }
  };


  return {
    gsLoad: customGsLoad,
    gsSave: customGsSave,
    gsItemChanged: customGsItemChanged,
    gsDelete: customGsDelete,
    gsUpload: customGsUpload,
    gsDownload: customGsDownload,
    gsAny: customGsAny,
    gsInvoke,
    fns,
  };
};
