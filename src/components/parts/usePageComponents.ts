import { ref, markRaw, defineAsyncComponent, reactive } from "vue";

export const usePageComponents = () => {

  const gsComponentData = ref([
    {
      name: "uploadForm",
      props: {},
    },
    {
      name: "customForm",
      props: {},
    },
    {
      name: "layoutParts",
      props: {},
    },
    {
      name: "editable",
      props: {},
    },
    {
      name: "arcoform",
      props: {},
    },
    {
      name: "pageList",
      props: {},
    },
  ]);

  const gsComponents: any = reactive({
    customForm: markRaw(
      defineAsyncComponent(() => import("@/components/parts/CustomForm.vue"))
    ),
    uploadForm: markRaw(
      defineAsyncComponent(() => import("@/components/parts/UploadForm.vue"))
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
  });

  const getItemCompnent = (componentName: string) =>{
    return gsComponents[componentName];
  }

  return { gsComponentData, gsComponents, getItemCompnent };
};
