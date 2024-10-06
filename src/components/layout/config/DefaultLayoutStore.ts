import { defineStore } from "pinia";
import axios from "axios";
import { apiJsonHeaders, webApiUrl } from "../../../store/storeConstants";
import { PageProps } from "@/components/layout/StackEvent";

const dataUrl = `${webApiUrl}/pages`;

export const useDefaultLayoutStore = defineStore("defaultLayout", {
  state: () => ({
    pageList: [] as PageProps[],
  }),

  getters: {
    category: (state) => {
      return (pageId: string) =>
        state.pageList.find((page) => page.id === pageId);
    },
  },

  actions: {
    async getPageList() {
      return await axios.get(`${dataUrl}`).then((response) => {
        this.pageList = response.data;
        return response.data;
      });
    },

    async getPageById(pageId: string) {
      return await axios
        .get(`${dataUrl}/${pageId}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          return null;
        });
    },

    async exists(pageId: string) {
      return (await this.getPageById(pageId)) != null;
    },

    async savePage(data: PageProps) {
      if (!(await this.exists(data.id))) {
        return await this.insertPage(data);
      } else {
        return await this.updatePage(data);
      }
    },

    async insertPage(data: PageProps) {
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

    async updatePage(data: PageProps) {
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

    async deletePage(pageId: string) {
      const method = "DELETE";
      const headers = apiJsonHeaders;
      return await axios
        .delete(`${dataUrl}/${pageId}`, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        });
    },
  }, //actions
});
