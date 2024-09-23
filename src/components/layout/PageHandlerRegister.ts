import { reactive } from "vue";
import { useComponentHandlers } from "./useComponentHandlers";

const PageHandlerRegister = () => {
    
  const handlers = reactive([
    {
      pageid: "page@68f5454a-98a1-4e74-acd0-c9ea0fde5050",
      name:   "test page",
      title:  "page title",
      handler: (page: any, invoke: any, invokeByName: any) =>
        useComponentHandlers(
          page,
          invoke,
          invokeByName,
          function (cid: string, data: any) {
            console.log("custom load handler");
          },
          function (cid: string, data: any) {
            console.log("custom save handler");
          },
          function (cid: string, data: any) {
            console.log("custom item change handler");
          }
        ),
    },

  ]);

  const getMyPageHandler = (pageId: string) => {};
};
