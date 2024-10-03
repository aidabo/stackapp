
// auto-generated: GsHandlers.ts: Thu Oct 03 2024 19:14:05 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageHandler } from "@/components/layout/GridEvent";
import { useDefaultHandler } from "@/handlers/DefaultHandler";
import { useTestHandler } from "@/handlers/TestHandler";

export const gsHandlers = reactive<PageHandler[]>([

  {
        name: "DefaultHandler",
        handler: useDefaultHandler,
  },

  {
        name: "TestHandler",
        handler: useTestHandler,
  },
]);
