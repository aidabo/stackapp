
// auto-generated: GsHandlers.ts: Wed Oct 02 2024 23:41:17 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageHandler } from "@/components/layout/GridEvent";
import { useDefaultHandler } from "@/components/dynamic/handlers/DefaultHandler";
import { useTestHandler } from "@/components/dynamic/handlers/TestHandler";

export const gsHandlers = reactive<PageHandler[]>([{
        name: "DefaultHandler",
        handler: useDefaultHandler,
      },
{
        name: "TestHandler",
        handler: useTestHandler,
      },
]);
