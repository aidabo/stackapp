
// auto-generated: GsHandlers.ts: Sun Oct 06 2024 09:49:38 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageHandler } from "@/components/layout/StackEvent";
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
