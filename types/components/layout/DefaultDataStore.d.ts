export declare const dataUrl: string;
export declare const useDefaultDataStore: import("pinia").StoreDefinition<"defaultDataStore", {
    dataList: any[];
}, {
    get: (state: {
        dataList: any[];
    } & import("pinia").PiniaCustomStateProperties<{
        dataList: any[];
    }>) => (id: string) => any;
}, {
    getDataList(): Promise<any>;
    getDataById(id: string): Promise<any>;
    getDataByName(cname: string): Promise<any>;
    getDataByCid(cid: string): Promise<any>;
    getDataByAliasName(aliasName: string): Promise<any>;
    exists(id: string): Promise<boolean>;
    saveData(data: any, cid: string, cname?: string): Promise<any>;
    insertData(data: any, cid: string, cname?: string): Promise<any>;
    updateData(data: any, cid: string, cname?: string): Promise<any>;
    deleteData(id: string): Promise<any>;
}>;
