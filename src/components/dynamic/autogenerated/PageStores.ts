
// auto-generated: PageStores.ts: Thu Oct 17 2024 12:29:48 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageStore } from "@/components/layout/StackEvent";
import { useSimpleDataStore } from "@/store/SimpleDataStore";
import { useSimpleLayoutStore } from "@/store/SimpleLayoutStore";
import { useTestDataStore } from "@/store/TestDataStore";
import { useTestLayoutStore } from "@/store/TestLayoutStore";

export const PageStores = reactive<PageStore[]>([

  {
        name: "SimpleDataStore",
        store: useSimpleDataStore,
  },

  {
        name: "SimpleLayoutStore",
        store: useSimpleLayoutStore,
  },

  {
        name: "TestDataStore",
        store: useTestDataStore,
  },

  {
        name: "TestLayoutStore",
        store: useTestLayoutStore,
  },
]);
