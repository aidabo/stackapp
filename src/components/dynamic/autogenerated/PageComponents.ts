
// auto-generated: PageComponents.ts: Sun Oct 06 2024 15:37:42 GMT+0900 (Japan Standard Time)
//
import { reactive } from "vue";
import { PageComponent } from "@/components/layout/StackEvent";
import {
        component as arcoform_comp,
        props as arcoform_props,
} from "@/components/dynamic/component/arcoform";
import {
        component as formexample_comp,
        props as formexample_props,
} from "@/components/dynamic/component/formexample";

export const PageComponents = reactive<PageComponent[]>([
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
