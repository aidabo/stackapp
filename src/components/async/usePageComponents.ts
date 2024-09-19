import { ref, markRaw, defineAsyncComponent, reactive } from "vue";
import { Base64 } from "js-base64";

export const usePageComponents = () => {

  const gsComponentData = reactive([
    {
      name: "arcoform",
      description: "Drag me Arcoform",
      props: {},
    },
    {
      name: "dynamicrender",
      description: "Drag me DynamicRender",
      props: {},
    }, 
    {
      name: "example",
      description: "Drag me Example",
      props: {},
    }, 
    {
      name: "componentb",
      description: "Drag me componentB",
      props: {},
    },
    {
      name: "uploadForm",
      description: "Drag me UploadForm",
      props: {},
    },
    {
      name: "customForm",
      description: "Drag me CustomForm",
      props: {},
    },
    {
      name: "layoutParts",
      description: "Drag me LayoutParts",
      props: {},
    },
    {
      name: "editable",
      description: "Drag me Editable",
      props: {},
    },
    {
      name: "pageList",
      description: "Drag me PageList",
      props: {},
    },    
    {
      name: "forminput",
      description: "Drag me FormkitInput",
      props: {},
    }, 
    {
      name: "schemakit",
      description: "Drag me SchemaKit",
      props: {},
    }, 

    {
      name: "formkiticon",
      description: "Drag me FormKit Icon",
      props: {},
    }, 
    {
      name: "componenta",
      description: "Drag me componentA",
      props: {},
    },
    {
      name: "image",
      description: "Drag me Image",
      props: {},
    },
  ]);

  const gsComponents: any = ref({
    //MUST use defineAsyncComponent to render lazy
    customForm: markRaw(defineAsyncComponent(() => import("@/components/parts/CustomForm.vue"))),
    layoutParts: markRaw(defineAsyncComponent(() => import("@/components/parts/LayoutParts.vue"))),
    editable: markRaw(defineAsyncComponent(() => import("@/components/parts/Editable.vue"))),
    arcoform: markRaw(defineAsyncComponent(() => import("@/components/parts/ArcoForm.vue"))),
    pageList: markRaw(defineAsyncComponent(() => import("@/components/parts/SimpleListParts.vue"))),   
    dynamicrender: markRaw(defineAsyncComponent(()=>import('@/components/formkit/DynamicRender'))),
    example: markRaw(defineAsyncComponent(() => import("@/components/formkit/FormExample.vue"))),
    forminput: markRaw(defineAsyncComponent(() => import("@/components/formkit/FormkitInput.vue"))),
    schemakit: markRaw(defineAsyncComponent(() => import("@/components/formkit/SchemaKit.vue"))),
    formkiticon: markRaw(defineAsyncComponent(() => import("@/components/formkit/FormKitIcon.vue"))),
    uploadForm: markRaw(defineAsyncComponent(() => import("@/components/formkit/FileUpload.vue"))),
    componentb: markRaw(defineAsyncComponent(() => import("@/components/test/ComponentB.vue"))),
    componenta: markRaw(defineAsyncComponent(() => import("@/components/test/ComponentA"))),
    image: markRaw(defineAsyncComponent(() => import("@/components/test/Image.vue"))),
  });

  /**
   * Get component itself
   * @param componentName 
   * @returns 
   */
  function gsGetItemCompnent(componentName: string) {
    return gsComponents.value[componentName];
  }

  const gsGetComponentInfo = (componentName: string) => {
    return Base64.encode(JSON.stringify(gsComponentData.find(c => c.name == componentName)));
  }
  
  return { gsComponentData, gsComponents, gsGetItemCompnent, gsGetComponentInfo };
};
