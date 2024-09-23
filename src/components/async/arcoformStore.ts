import { defineStore } from "pinia";
import axios from "axios";
import { apiJsonHeaders } from "@/store/storeConstants";
import { ArcoformData, arcoformUrl as dataUrl } from "./arcoform";

export const useArcoformStore = defineStore("arcoform", {
  state: () => ({
    dataList: [] as ArcoformData[],
  }),

  getters: {
    get: (state) => {
      return (cid: string) =>
        state.dataList.find((comp) => comp.id === cid);
    },
  },

  actions: {
    async getList() {
      return await axios.get(dataUrl).then((response) => {
        this.dataList = response.data;
        return response.data;
      });
    },

    async getById(id: string) {
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

    async exists(id: string) {
      return ((await this.getList()) || []).find(
        (p: any) => p.id == id
      );
    },

    async save(data: ArcoformData) {
      if (!(await this.exists(data.id))) {
        return await this.insert(data);
      } else {
        return await this.update(data);
      }
    },

    async insert(data: ArcoformData) {
      const method = "POST";

      const body = JSON.stringify(data);
      const headers = apiJsonHeaders;
      return await axios
        .post(`${dataUrl}`, body, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        });
    },

    async update(data: ArcoformData) {
      const method = "PUT";
      const body = JSON.stringify(data);
      const headers = apiJsonHeaders;
      return await axios
        .patch(`${dataUrl}/${data.id}`, body, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        });
    },

    async delete(id: string) {
      const method = "DELETE";
      const headers = apiJsonHeaders;
      return await axios
        .delete(`${dataUrl}/${id}`, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        });
    },
  }, //actions
});
