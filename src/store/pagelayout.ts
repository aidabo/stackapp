import { defineStore } from "pinia";
import axios from "axios";
import { apiJsonHeaders, webApiUrl } from "./storeConstants";
import { PageProps } from "@/components/layout/lygs/GridEvent";

/*
export interface GridOptions {
  id: string;
  columns: number;
  float: boolean;
  compact: boolean;
  minRow?: number;
  maxRow?: number;
  cellHeight: number;
  components?: [];
}

export interface PageProps {
  id: string;
  title: string;
  static: true;
  description?: string;
  icon?: string;
  image?: string;
  category?: string;
  status?: string;
  grids?: Array<GridOptions>;
  gsComponents?: [];
}

export const createGridOptions = (opt?: Partial<GridOptions>): GridOptions => {
  return {
    id: opt?.id ?? uuidv4(),
    columns: opt?.columns ?? 12,
    float: opt?.float ?? false,
    compact: opt?.compact ?? false,
    cellHeight: opt?.cellHeight ?? 70,
    components: opt?.components ?? [],
  } as GridOptions;
};

export const createPageProps = (opt?: Partial<PageProps>): PageProps => {
  return {
    id: opt?.id ?? uuidv4(),
    title: opt?.title ?? "Create a new Page",
    static: opt?.static ?? true,
    description: opt?.description ?? opt?.title,
    icon: opt?.icon ?? "",
    image: opt?.image ?? "",
    category: opt?.category ?? "unknown",
    status: opt?.status ?? "",
  } as PageProps;
};

*/

export const usePageLayoutStore = defineStore("pagelayout", {
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
      return await axios.get(`${webApiUrl}/pages`).then((response) => {
        this.pageList = response.data;
        console.log("getAll", response.data);
        return response.data;
      });
    },

    async getPageById(pageId: string) {
      return await axios
        .get(`${webApiUrl}/pages/${pageId}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err.message);
          return null;
        });
    },

    async exists(pageId: string) {
      return ((await this.getPageList()) || []).find(
        (p: any) => p.id == pageId
      );
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
        .post(`${webApiUrl}/pages`, body, {
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
        .patch(`${webApiUrl}/pages/${data.id}`, body, {
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
        .delete(`${webApiUrl}/pages/${pageId}`, {
          method,
          headers,
        })
        .then((response) => {
          return response.data;
        });
    },
  }, //actions
});
