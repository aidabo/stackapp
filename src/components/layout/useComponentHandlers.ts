import { PageProps } from "@/components/layout/GridEvent";

export const useComponentHandlers = (
  page: PageProps,
  invoke: (fn: string, cid?: string, data?: any) => any,
  invokeByName: (fn: string, compName?: string, data?: any) => any,
  //hook to override handlers
  loadHandler?: (cid: string, data?: any, callback?: Function) => any,
  saveHandler?: (cid: string, data: any, callback?: Function) => any,
  itemChangedHandler?: (cid: string, data: any, callback?: Function) => any,
  deleteHandler?: (cid: string, data: any, callback?: Function) => any,
  uploadHandler?: (cid: string, data: any, callback?: Function) => any,
  optionHandler?: (cid: string, data: any, callback?: Function) => any
) => {
  /**
   * Callback provided by parent to load data
   * @param event
   */
  const customLoadHandler =
    loadHandler ||
    ((cid: string, data?: any, callback?: Function) => {
      console.log("default loadHandler event called", data);
    });

  /**
   * Callback provided by parent to save data to store
   * @param event
   */
  const customSaveHandler =
    saveHandler ||
    ((cid: string, data: any, callback?: Function) => {
      console.log("default saveHandler event called", data);
    });

  /**
   * emited by gscomponent when data changed
   * @param event
   */
  const customItemChangedHandler =
    itemChangedHandler ||
    ((cid: string, data: any, callback?: Function) => {
      console.log("default itemChangedHandler event received", data);
    });

  const customDeleteHandler =
    deleteHandler ||
    ((cid: string, data: any, callback?: Function) => {
      console.log("default deleteHandler event called", data);
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
    data?: any
  ): Promise<any[]> => {
    return await invoke(fn, cid, data);
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
    data?: any
  ): Promise<any[]> => {
    return await invokeByName(fn, compName, data);
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
  };
};
