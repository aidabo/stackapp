
// auto-generated: PageHandlers.ts: Sun Oct 06 2024 15:37:42 GMT+0900 (Japan Standard Time)
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
