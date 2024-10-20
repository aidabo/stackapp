import { v4 as uuidv4 } from "uuid";
import { apiJsonHeaders, webApiUrl } from "../../store/storeConstants";

export const useDefaultDataStore = () => {
  const dataUrl = `${webApiUrl}/comp_data`;

  async function getDataList(): Promise<any> {
    try {
      const response = await fetch(`${dataUrl}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("fetchDataList error:", error);
      return false;
    }
  }

  async function getDataById(id: string): Promise<any> {
    try {
      const response = await fetch(`${dataUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("getDataById error:", error);
      return false;
    }
  }

  async function getDataByCid(cid: string) {
    try {
      const response = await fetch(`${dataUrl}?cid=${cid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("getDataByCid error:", error);
      return false;
    }
  }

  async function getDataByName(cname: string) {
    try {
      const response = await fetch(`${dataUrl}?cname=${cname}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("getDataByName error:", error);
      return false;
    }
  }

  async function getDataByAliasName(aliasName: string) {
    try {
      const response = await fetch(`${dataUrl}?aliasName=${aliasName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("getDataByAliasName error:", error);
      return false;
    }
  }

  async function exists(id: string): Promise<boolean> {
    const result = await getDataById(id);
    return result != null && result !== false;
  }

  async function saveData(data: any, cid: string, cname?: string) {
    try {
      if (!data.id || !(await exists(data.id))) {
        return await insertData(data, cid, cname);
      } else {
        return await updateData(data, cid, cname);
      }
    } catch (error) {
      console.error("saveData error:", error);
      return false;
    }
  }

  async function insertData(
    data: any,
    cid: string,
    cname?: string
  ): Promise<any> {
    try {
      if (!data.id) {
        data.id = uuidv4();
      }
      if (cname) data["cname"] = cname;
      if (cid) data["cid"] = cid;
      const response = await fetch(`${dataUrl}`, {
        method: "POST",
        headers: apiJsonHeaders,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("insertData error:", error);
      return false;
    }
  }

  async function updateData(
    data: any,
    cid: string,
    cname?: string
  ): Promise<any> {
    try {
      if (cname) data["cname"] = cname;
      if (cid) data["cid"] = cid;
      const response = await fetch(`${dataUrl}/${data.id}`, {
        method: "PUT",
        headers: apiJsonHeaders,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("updateData error:", error);
      return false;
    }
  }

  async function deleteData(id: string): Promise<any> {
    try {
      const response = await fetch(`${dataUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("deleteData error:", error);
      return false;
    }
  }

  return {
    getDataList,
    getDataById,
    getDataByCid,
    getDataByAliasName,
    getDataByName,
    saveData,
    exists,
    insertData,
    updateData,
    deleteData,
  };
};
