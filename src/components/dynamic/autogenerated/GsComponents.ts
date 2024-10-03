
// auto-generated: GsComponents.ts: Thu Oct 03 2024 19:14:05 GMT+0900 (Japan Standard Time)
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
