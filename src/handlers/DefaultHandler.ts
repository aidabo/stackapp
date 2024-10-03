import { reactive } from "vue";
import { useDefaultDataStore } from "@/store/DefaultDataStore";
import { GsEvent } from "@/components/layout/GridEvent";
import { useTestDataStore } from "@/store/TestDataStore";

export const useDefaultHandler = (
  gsLoad?: (event: GsEvent, callback?: Function) => any,
  gsSave?: (event: GsEvent, callback?: Function) => any,
  gsItemChanged?: (event: GsEvent, callback?: Function) => any,
  gsDelete?: (event: GsEvent, callback?: Function) => any,
  gsUpload?: (event: GsEvent, callback?: Function) => any,
  gsDownload?: (event: GsEvent, callback?: Function) => any,
  gsAny?: (event: GsEvent, callback?: Function) => any
) => {

  const { getDataById, getDataByName, getDataByCid, getDataList, saveData, deleteData  } = useTestDataStore()
  
  const fns = reactive({
    invoke: (fn: string, event: GsEvent, callback?: Function):any => {},
  })

  /**
   * Callback provided by parent to load data
   * @param event
   */
  const customGsLoad =
    gsLoad ||
    (async(event: GsEvent, callback?: Function) => {
      
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
    (async(event: GsEvent, callback?: any) => {
      
      console.log("default saveHandler event called", event.data);

        event.data["cname"] = event.source?.cname;
        event.data["aliasName"] = event.source?.aliasName;
        const result = await saveData(event.data, event.srcId)
        if(callback){
            callback(result);
        }
    });

  /**
   * emited by gscomponent when data changed
   * @param event
   */
  const customGsItemChanged =
    gsItemChanged ||
    (async(event: GsEvent, callback?: Function) => {
      console.log("default itemChangedHandler event received: ", event.srcId, event.data);
      if(callback){
        callback(true)
      }
    });

  const customGsDelete =
    gsDelete ||
    (async(event: GsEvent, callback?: Function) => {
      console.log("default deleteHandler event called", event.data);
      const result = await deleteData(event.data.id);
      if(callback){
        callback(result);
      }
    });

  const customGsUpload =
    gsUpload ||
    ((event: GsEvent, callback?: Function) => {
      console.log("default uploadHandler event called", event.data);
      //TODO
      if(callback){
        callback(true)
      }
    });

    const customGsDownload =
    gsDownload ||
    ((event: GsEvent, callback?: Function) => {
      console.log("default uploadHandler event called", event.data);
      //TODO
      if(callback){
        callback(true)
      }
    });

  const customGsAny =
    gsAny ||
    ((event: GsEvent, callback?: Function) => {
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
    event: GsEvent,
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
