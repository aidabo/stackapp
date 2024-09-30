import { reactive } from "vue";
import { useDefaultDataStore } from "@/components/dynamic/store/DefaultDataStore";
import { GsEvent } from "@/components/layout/GridEvent";
import { useTestDataStore } from "../store/TestDataStore";

export const useDefaultHandler = (
  loadHandler?: (event: GsEvent, callback?: Function) => any,
  saveHandler?: (event: GsEvent, callback?: Function) => any,
  itemChangedHandler?: (event: GsEvent, callback?: Function) => any,
  deleteHandler?: (event: GsEvent, callback?: Function) => any,
  uploadHandler?: (event: GsEvent, callback?: Function) => any,
  callHandler?: (event: GsEvent, callback?: Function) => any
) => {

  const { getDataById, getDataByName, getDataByCid, getDataList, saveData, deleteData  } = useTestDataStore()
  //useDefaultComponentStore();

  const fns = reactive({
    invoke: (fn: string, event: GsEvent, callback?: Function):any => {},
  })

  /**
   * Callback provided by parent to load data
   * @param event
   */
  const customLoadHandler =
    loadHandler ||
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
  const customSaveHandler =
    saveHandler ||
    (async(event: GsEvent, callback?: any) => {
      console.log("default saveHandler event called", event.data);
        event.data["cname"] = event.cname;
        event.data["aliasName"] = event.aliasName;
        const result = await saveData(event.data, event.cid)
        if(callback){
            callback(result);
        }
    });

  /**
   * emited by gscomponent when data changed
   * @param event
   */
  const customItemChangedHandler =
    itemChangedHandler ||
    (async(event: GsEvent, callback?: Function) => {
      console.log("default itemChangedHandler event received: ", event.cid, event.data);
      if(callback){
        callback(true)
      }
    });

  const customDeleteHandler =
    deleteHandler ||
    (async(event: GsEvent, callback?: Function) => {
      console.log("default deleteHandler event called", event.data);
      const result = await deleteData(event.data.id);
      if(callback){
        callback(result);
      }
    });

  const customUploadHandler =
    uploadHandler ||
    ((event: GsEvent, callback?: Function) => {
      console.log("default uploadHandler event called", event.data);
      //TODO
      if(callback){
        callback(true)
      }
    });

  const customCallHandler =
    callHandler ||
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
  const invoke = async (
    fn: string,
    event: GsEvent,
    callback?: Function
  ) => {
    if(fns.invoke){
      return await fns.invoke(fn, event, callback) as any;
    }
  };


  return {
    loadHandler: customLoadHandler,
    saveHandler: customSaveHandler,
    itemChangedHandler: customItemChangedHandler,
    deleteHandler: customDeleteHandler,
    uploadHandler: customUploadHandler,
    callHandler: customCallHandler,
    invoke,
    fns,
  };
};
