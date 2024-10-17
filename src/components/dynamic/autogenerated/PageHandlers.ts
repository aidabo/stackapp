
// auto-generated: PageHandlers.ts: Thu Oct 17 2024 10:59:24 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageHandler } from "@/components/layout/StackEvent";
import { useTestHandler } from "@/handlers/TestHandler";

export const PageHandlers = reactive<PageHandler[]>([

  {
        name: "TestHandler",
        handler: useTestHandler,
  },
]);
