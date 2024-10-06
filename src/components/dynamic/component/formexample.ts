import { markRaw, defineAsyncComponent } from "vue";
import {
  ComponentOption,
} from "@/components/layout/StackEvent";

export const component = () =>
  markRaw(
    defineAsyncComponent(() => import("@/components/samples/FormExample.vue"))
  );

/**
 * CAN NOT use withDefaults, defineProps etc. compiler-hint helper
 * @returns
 */
export const props = (): ComponentOption => {
  return {
    cname: "formexample",
    description: "Drag me Example",
    data: {},
  };
};
