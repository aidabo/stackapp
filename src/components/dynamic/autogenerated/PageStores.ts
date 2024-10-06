
// auto-generated: GsStores.ts: Sun Oct 06 2024 09:49:38 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageStore } from "@/components/layout/StackEvent";
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
