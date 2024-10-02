
// auto-generated: GsComponents.ts: Wed Oct 02 2024 23:41:17 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageCompnent } from "@/components/layout/GridEvent";
import {
        component as arcoform_comp,
        props as arcoform_props,
} from "@/components/dynamic/component/arcoform";
import {
        component as formexample_comp,
        props as formexample_props,
} from "@/components/dynamic/component/formexample";

export const gsComponents = reactive<PageCompnent[]>([
  {
    props:
      typeof arcoform_props === "function" ? arcoform_props() : arcoform_props,
    component:
      typeof arcoform_comp === "function" ? arcoform_comp() : arcoform_comp,
  },

  {
    props:
      typeof formexample_props === "function" ? formexample_props() : formexample_props,
    component:
      typeof formexample_comp === "function" ? formexample_comp() : formexample_comp,
  },
]);
