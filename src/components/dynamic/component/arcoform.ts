import { markRaw, defineAsyncComponent} from "vue";
import {
  createComponentOption,
} from "@/components/layout/StackEvent";

export const component = ()=>markRaw(
  defineAsyncComponent(() => import("@/components/samples/ArcoForm.vue"))
);

/**
 * CAN NOT use withDefaults, defineProps etc. compiler-hint helper
 * @returns 
 */
export const props = () =>
  createComponentOption("arcoform", "Drag me Arcoform", undefined, {
    options: [
      {
        value: "beijing",
        label: "Beijing",
        children: [
          {
            value: "chaoyang",
            label: "ChaoYang",
            children: [
              {
                value: "datunli",
                label: "Datunli",
              },
            ],
          },
          {
            value: "haidian",
            label: "Haidian",
          },
          {
            value: "dongcheng",
            label: "Dongcheng",
          },
          {
            value: "xicheng",
            label: "XiCheng",
          },
        ],
      },
      {
        value: "shanghai",
        label: "Shanghai",
        children: [
          {
            value: "shanghaishi",
            label: "Shanghai",
            children: [
              {
                value: "huangpu",
                label: "Huangpu",
              },
            ],
          },
        ],
      },
    ], //options
    treeData: [
      {
        key: "node1",
        title: "Node1",
        children: [
          {
            key: "node2",
            title: "Node2",
          },
        ],
      },
      {
        key: "node3",
        title: "Node3",
        children: [
          {
            key: "node4",
            title: "Node4",
          },
          {
            key: "node5",
            title: "Node5",
          },
        ],
      },
    ],
  });
