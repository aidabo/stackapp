import { ref, reactive } from "vue";
import { useDefaultComponentDataStore } from "@/store/DefaultPageDataStore";
import { PageProps } from "@/components/layout/GridEvent";

export const useDefaultPageHandlers = (
  loadHandler?: (cid: string, data?: any, callback?: Function) => any,
  saveHandler?: (cid: string, data: any, callback?: Function) => any,
  itemChangedHandler?: (cid: string, data: any, callback?: Function) => any,
  deleteHandler?: (cid: string, data: any, callback?: Function) => any,
  uploadHandler?: (cid: string, data: any, callback?: Function) => any,
  optionHandler?: (cid: string, data?: any, callback?: Function) => any
) => {

  const { getDataById, getDataByName, getDataByCid, getDataList, saveData, deleteData  } = useDefaultComponentDataStore();

  const pageProps = ref<PageProps>()

  const fns = reactive({
    invoke: (fn: string, compname: string, data?: any, callback?: Function):any => {},
    invokeByName: (fn: string, compname: string, data?: any, callback?: Function):any => {}
  })

  const setCaller = (page: any, invokeFn: Function, invokeByNameFn: Function) =>{
    pageProps.value = page;
    fns.invoke = invokeFn as any;
    fns.invokeByName = invokeByNameFn as any;
  }

  /**
   * Callback provided by parent to load data
   * @param event
   */
  const customLoadHandler =
    loadHandler ||
    (async(cid: string, data?: any, callback?: Function) => {
      console.log("default loadHandler event called", data);
        return await getDataById(data.id) || getDataByCid(cid);
    });

  /**
   * Callback provided by parent to save data to store
   * @param event
   */
  const customSaveHandler =
    saveHandler ||
    (async(cid: string, data: any, callback?: any) => {
      console.log("default saveHandler event called", data);
      try{
        const result = await saveData(data, cid)
        console.log("result", result);
        if(callback){
            callback(result);
        }
      }catch(err){
        console.log(err);
        throw err;
      }
    });

  /**
   * emited by gscomponent when data changed
   * @param event
   */
  const customItemChangedHandler =
    itemChangedHandler ||
    (async(cid: string, data: any, callback?: Function) => {
      console.log("default itemChangedHandler event received: ", cid, data);
    });

  const customDeleteHandler =
    deleteHandler ||
    (async(cid: string, data: any, callback?: Function) => {
      console.log("default deleteHandler event called", data);
      await deleteData(data.id);
    });

  const customUploadHandler =
    uploadHandler ||
    ((cid: string, data: any, callback?: Function) => {
      console.log("default uploadHandler event called", data);
    });

  const customOptionHandler =
    optionHandler ||
    ((cid: string, data: any, callback?: Function) => {
      console.log("default optionHandler event called", data);
    });

  /**
   * Invoke component function, return result
   * Function can be a async or sync function
   * Function example:
   * async test1(cid:string, data:any):any
   * test1(cid:string, data:any):any
   *
   * @param fn function name
   * @param cid  args of component id
   * @param data  args of data
   * @returns
   */
  const invokeCF = async (
    fn: string,
    cid?: string,
    data?: any,
    callback?: Function
  ) => {
    if(fns.invoke){
      return await (fns.invoke as Function) (fn, cid, data, callback) as any;
    }
  };

  /**
   * Invoke function specified component by name, maybe multiple
   * @param fn
   * @param compName
   * @param data
   * @returns
   */
  const invokeCFByName = async (
    fn: string,
    compName?: string,
    data?: any,
    callback?: Function
  ) => {
    if(fns.invokeByName){
      return await (fns.invokeByName as Function) (fn, compName, data, callback) as any;
    }
  };

  return {
    loadHandler: customLoadHandler,
    saveHandler: customSaveHandler,
    itemChangedHandler: customItemChangedHandler,
    deleteHandler: customDeleteHandler,
    uploadHandler: customUploadHandler,
    optionHandler: customOptionHandler,
    invokeCF,
    invokeCFByName,
    setCaller
  };
};
