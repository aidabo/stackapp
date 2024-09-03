import { ref, markRaw, defineAsyncComponent, reactive } from "vue";
import { Base64 } from "js-base64";

export const usePageComponents = () => {

  const gsComponentData = ref([
    {
      name: "uploadForm",
      //description: "Drag me UploadForm",
      props: {},
    },
    {
      name: "customForm",
      //description: "Drag me CustomForm",
      props: {},
    },
    {
      name: "layoutParts",
      //description: "Drag me LayoutParts",
      props: {},
    },
    {
      name: "editable",
      //description: "Drag me Editable",
      props: {},
    },
    {
      name: "arcoform",
      //description: "Drag me Arcoform",
      props: {},
    },
    {
      name: "pageList",
      //description: "Drag me PageList",
      props: {},
    },
  ]);

  const gsComponents: any = reactive({
    customForm: markRaw(defineAsyncComponent(() => import("@/components/parts/CustomForm.vue"))),
    uploadForm: markRaw(defineAsyncComponent(() => import("@/components/parts/UploadForm.vue"))),
    layoutParts: markRaw(defineAsyncComponent(() => import("@/components/parts/LayoutParts.vue"))),
    editable: markRaw(defineAsyncComponent(() => import("@/components/parts/Editable.vue"))),
    arcoform: markRaw(defineAsyncComponent(() => import("@/components/parts/ArcoForm.vue"))),
    pageList: markRaw(defineAsyncComponent(() => import("@/components/parts/SimpleListParts.vue"))),

  });

  /**
   * Get component itself
   * @param componentName 
   * @returns 
   */
  function gsGetItemCompnent(componentName: string) {
    return gsComponents[componentName];
  }

  const gsGetComponentInfo = (componentName: string) => {
    return Base64.encode(JSON.stringify(gsComponentData.value.find(c => c.name == componentName)));
  }
  
  return { gsComponentData, gsComponents, gsGetItemCompnent, gsGetComponentInfo };
};
