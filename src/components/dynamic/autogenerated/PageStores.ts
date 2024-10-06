
// auto-generated: PageStores.ts: Sun Oct 06 2024 15:37:42 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageStore } from "@/components/layout/StackEvent";
import { useTestDataStore } from "@/store/TestDataStore";
import { useTestLayoutStore } from "@/store/TestLayoutStore";

export const PageStores = reactive<PageStore[]>([

  {
        name: "TestDataStore",
        store: useTestDataStore,
  },

  {
        name: "TestLayoutStore",
        store: useTestLayoutStore,
  },
]);
