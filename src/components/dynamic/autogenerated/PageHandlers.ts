
// auto-generated: PageHandlers.ts: Sun Oct 13 2024 15:27:54 GMT+0900 (Japan Standard Time)
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
