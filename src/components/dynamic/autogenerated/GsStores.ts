
// auto-generated: GsStores.ts: Wed Oct 02 2024 23:41:17 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageStore } from "@/components/layout/GridEvent";
import { useDefaultDataStore } from "@/components/dynamic/store/DefaultDataStore";
import { useDefaultLayoutStore } from "@/components/dynamic/store/DefaultLayoutStore";
import { useTestDataStore } from "@/components/dynamic/store/TestDataStore";

export const gsStores = reactive<PageStore[]>([{
        name: "DefaultDataStore",
        store: useDefaultDataStore,
      },
{
        name: "DefaultLayoutStore",
        store: useDefaultLayoutStore,
      },
{
        name: "TestDataStore",
        store: useTestDataStore,
      },
]);
