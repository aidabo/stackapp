export declare const useDefaultDataStore: () => {
    getDataList: () => Promise<any>;
    getDataById: (id: string) => Promise<any>;
    getDataByCid: (cid: string) => Promise<any>;
    getDataByAliasName: (aliasName: string) => Promise<any>;
    getDataByName: (cname: string) => Promise<any>;
    saveData: (data: any, cid: string, cname?: string) => Promise<any>;
    exists: (id: string) => Promise<boolean>;
    insertData: (data: any, cid: string, cname?: string) => Promise<any>;
    updateData: (data: any, cid: string, cname?: string) => Promise<any>;
    deleteData: (id: string) => Promise<any>;
};
