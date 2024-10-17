
// auto-generated: PageStores.ts: Thu Oct 17 2024 10:59:24 GMT+0900 (Japan Standard Time)
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
