import { markRaw, defineAsyncComponent } from "vue";
import {
  ComponentOption,
} from "@/components/layout/StackEvent";

export const component = () =>
  markRaw(
    defineAsyncComponent(() => import("@/components/samples/FormKitSchema.vue"))
  );

/**
 * CAN NOT use withDefaults, defineProps etc. compiler-hint helper
 * @returns
 */
export const props = (): ComponentOption => {
  return {
    cname: "formkitschema",
    description: "Drag me Formkit Schema",
    data: {},
  };
};
