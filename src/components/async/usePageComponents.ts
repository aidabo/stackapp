import { ref, markRaw, defineAsyncComponent, reactive } from "vue";
import { Base64 } from "js-base64";
import { ComponentOption, createComponentOption } from "../layout/GridEvent";

export const usePageComponents = () => {
  const gsComponentData = reactive<ComponentOption[]>([
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
      gsData: {
        size: "medium",
        name: "",
        age: undefined,
        section: "",
        province: "haidian",
        options: [],
        date: "",
        time: "",
        radio: "radio one",
        slider: 5,
        score: 5,
        switch: false,
        multiSelect: ["section one"],
        treeSelect: "",
      },
    }),
    {
      name: "dynamicrender",
      description: "Drag me DynamicRender",
      data: {},
    },
    {
      name: "example",
      description: "Drag me Example",
      data: {},
    },
    {
      name: "componentb",
      description: "Drag me componentB",
      data: {},
    },
    {
      name: "uploadform",
      description: "Drag me UploadForm",
      data: {},
    },
    {
      name: "customForm",
      description: "Drag me CustomForm",
      data: {},
    },
    {
      name: "layoutParts",
      description: "Drag me LayoutParts",
      data: {},
    },
    {
      name: "pageList",
      description: "Drag me PageList",
      data: {},
    },
    {
      name: "forminput",
      description: "Drag me FormkitInput",
      data: {},
    },
    {
      name: "schemakit",
      description: "Drag me SchemaKit",
      data: {},
    },

    {
      name: "formkiticon",
      description: "Drag me FormKit Icon",
      data: {},
    },
    {
      name: "componenta",
      description: "Drag me componentA",
      data: {},
    },
    {
      name: "image",
      description: "Drag me Image",
      data: {},
    },
  ]);

  const gsComponents: any = reactive({
    //MUST use defineAsyncComponent to render lazy
    customForm: markRaw(
      defineAsyncComponent(() => import("@/components/parts/CustomForm.vue"))
    ),
    layoutParts: markRaw(
      defineAsyncComponent(() => import("@/components/parts/LayoutParts.vue"))
    ),
    editable: markRaw(
      defineAsyncComponent(() => import("@/components/parts/Editable.vue"))
    ),
    arcoform: markRaw(
      defineAsyncComponent(() => import("@/components/parts/ArcoForm.vue"))
    ),
    pageList: markRaw(
      defineAsyncComponent(
        () => import("@/components/parts/SimpleListParts.vue")
      )
    ),
    dynamicrender: markRaw(
      defineAsyncComponent(() => import("@/components/formkit/DynamicRender"))
    ),
    example: markRaw(
      defineAsyncComponent(() => import("@/components/formkit/FormExample.vue"))
    ),
    forminput: markRaw(
      defineAsyncComponent(
        () => import("@/components/formkit/FormkitInput.vue")
      )
    ),
    schemakit: markRaw(
      defineAsyncComponent(() => import("@/components/formkit/SchemaKit.vue"))
    ),
    formkiticon: markRaw(
      defineAsyncComponent(() => import("@/components/formkit/FormKitIcon.vue"))
    ),
    uploadForm: markRaw(
      defineAsyncComponent(() => import("@/components/formkit/FileUpload.vue"))
    ),
    componentb: markRaw(
      defineAsyncComponent(() => import("@/components/test/ComponentB.vue"))
    ),
    componenta: markRaw(
      defineAsyncComponent(() => import("@/components/test/ComponentA"))
    ),
    image: markRaw(
      defineAsyncComponent(() => import("@/components/test/Image.vue"))
    ),
  });

  /**
   * Get component
   * @param componentName
   * @returns
   */
  const gsGetItemCompnent = (componentName: string) => {
    return gsComponents[componentName];
  };

  /**
   * Get component props info
   * @param componentName
   * @returns
   */
  const gsGetComponentInfo = (componentName: string) => {
    return gsComponentData.find((c) => c.name == componentName);
  };

  return {
    gsComponentData,
    gsComponents,
    gsGetItemCompnent,
    gsGetComponentInfo,
  };
};
