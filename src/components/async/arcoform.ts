import { defineAsyncComponent, markRaw } from "vue";
import {
  ComponentOption,
  createComponentOption,
} from "@/components/layout/GridEvent";
import { webApiUrl } from "@/store/storeConstants";

export const arcoformUrl = `${webApiUrl}/compsdata_arcoform`;

export const arcoform = markRaw(
  defineAsyncComponent(() => import("@/components/parts/ArcoForm.vue"))
);

export const props = withDefaults(defineProps<ComponentOption>(), {
  ...createComponentOption("arcoform", "Drag me Arcoform", arcoformUrl, {
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
  }),
});

export interface ArcoformData {    
  id: string;  
  compname: "arcoform"
  typeid?: string;
  size: string;
  name: string;
  age: number;
  section: string;
  province: string;
  options: [];
  date: string;
  time: string;
  radio: string;
  slider: number;
  score: number;
  switch: false;
  multiSelect: string[];
  treeSelect: string;
}
