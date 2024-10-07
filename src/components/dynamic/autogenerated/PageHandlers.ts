
// auto-generated: PageHandlers.ts: Mon Oct 07 2024 11:21:21 GMT+0900 (Japan Standard Time)
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
