import { markRaw, defineAsyncComponent, reactive } from "vue";
import { ComponentOption, createComponentOption } from "@/components/layout/GridEvent";
// @ts-ignore
import { environment } from "@/common/environment";
const { env } = environment();

export const arcoform = markRaw(defineAsyncComponent(() => import("@/components/parts/CustomForm.vue")))

export const props = withDefaults(defineProps<ComponentOption>(), 
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
  })
)
