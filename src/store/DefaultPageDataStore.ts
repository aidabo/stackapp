import { defineStore } from "pinia";
import axios from "axios";
import { apiJsonHeaders, webApiUrl } from "./storeConstants";
import { v4 as uuidv4 } from "uuid";

export const dataUrl = `${webApiUrl}/comp_data`;

export const useDefaultComponentDataStore = defineStore("componentDataStore", {
  state: () => ({
    dataList: [] as any[],
  }),

  getters: {
    get: (state) => {
      return (id: string) => state.dataList.find((d) => d.id === id);
    },
  },

  actions: {
    async getDataList() {
      return await axios.get(`${dataUrl}`).then((response) => {
        this.dataList = response.data;
        return response.data;
      });
    },

    async getDataById(id: string) {
      return await axios
        .get(`${dataUrl}/${id}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          return null;
        });
    },

    async getDataByName(cname: string) {
      return await axios
        .get(`${dataUrl}?cname=${cname}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          throw err;
        });
    },

    async getDataByCid(cid: string) {
      return await axios
        .get(`${dataUrl}?cid=${cid}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          throw err;
        });
    },

    async exists(id: string) {
      return (await this.getDataById(id)) != null;
    },

    async saveData(data: any, cid: string, cname?: string) {
      try {
        if (!data.id || !(await this.exists(data.id))) {
          return await this.insertData(data, cid, cname);
        } else {
          return await this.updateData(data, cid, cname);
        }
      } catch (err) {
        return false;
      }
    },

    async insertData(data: any, cid: string, cname?: string) {
      const method = "POST";
      if(!data.id){
        data.id = uuidv4();
      }
      if (cname) data["cname"] = cname;
      if (cid) data["cid"] = cid;
      const body = JSON.stringify(data);
      const headers = apiJsonHeaders;
      return await axios
        .post(`${dataUrl}`, body, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          throw err;
        });
    },

    async updateData(data: any, cid: string, cname?: string) {
      const method = "PUT";
      if (cname) data["cname"] = cname;
      if (cid) data["cid"] = cid;
      const body = JSON.stringify(data);
      const headers = apiJsonHeaders;
      return await axios
        .patch(`${dataUrl}/${data.id}`, body, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          throw err;
        });
    },

    async deleteData(id: string) {
      const method = "DELETE";
      const headers = apiJsonHeaders;
      return await axios
        .delete(`${dataUrl}/${id}`, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          throw err;
        });
    },
  }, //actions
});
