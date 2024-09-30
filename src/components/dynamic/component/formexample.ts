import { markRaw, defineAsyncComponent } from "vue";
import {
  ComponentOption,
} from "@/components/layout/GridEvent";

export const component = () =>
  markRaw(
    defineAsyncComponent(() => import("@/components/formkit/FormExample.vue"))
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
