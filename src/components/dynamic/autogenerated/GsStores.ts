
// auto-generated: GsStores.ts: Thu Oct 03 2024 19:14:05 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageStore } from "@/components/layout/GridEvent";
import { useDefaultDataStore } from "@/store/DefaultDataStore";
import { useDefaultLayoutStore } from "@/store/DefaultLayoutStore";
import { useTestDataStore } from "@/store/TestDataStore";

export const gsStores = reactive<PageStore[]>([

  {
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
