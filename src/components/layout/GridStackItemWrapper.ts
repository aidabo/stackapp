import {
  defineComponent,
  h,
  ref,
  onMounted,
  watch,
  resolveDynamicComponent,
  Component,
} from "vue";
import { v4 as uuidv4 } from "uuid";
import { usePageComponents } from "@/components/dynamic/PageComponents";

export default defineComponent({
  name: "GridStackItemWrapper",
  props: {
    gsItem: Object,
    //gsCompProps: Object,
    gsPageProps: Object,
    gsLoad: Function,
    gsSave: Function,
    //delete data
    gsDelete: Function,
    //item changed
    gsItemChanged: Function,
    //file upload
    gsRegister: Function,
    gsRemove: Function,
    gsUpload: Function,
    //other event
    gsCall: Function,
  },

  setup(props, { slots, emit }) {
    /**
     * gscomponent reactive props
     */
    const compProps = ref<any>();

    const component = ref<Component>();

    /**
     * get gscomponent
     */
    const { gsGetItemCompnent, gsGetComponentInfo } = usePageComponents();
   
    onMounted(() => {
      addWidgetComponentCB(props.gsItem);
      component.value = getGsComponent(props.gsItem) as any;
    });

    /**
     * when creating page, drag gscomponent into page firstly
     * @param item
     */
    const addWidgetComponentCB = (item: any) => {
      const itemEl = item.el;
      const itemElContent = itemEl.querySelector(".grid-stack-item-content");

      //if widget added by drag or add new create button
      const newWidget = itemEl.className.match(/newWidget\s/);
      if (newWidget) {
        const gscomponent = itemElContent.getAttribute("gscomponent");
        if (!gscomponent) {
          throw "No componnent info found!, newWidget must set gscomponent attrbute as component info\n <div class='newWidget ...' gscomponent=xxx>...</div>";
        }
        const gsComponentProps = gsGetComponentInfo(gscomponent);
        if (gsComponentProps) {
          gsComponentProps["cid"] = `comp_${uuidv4()}`;
        }
        item["gscomponent"] = gsComponentProps;
      }
    };

    /**
     * Get gscomponent and it's props definition
     * @param item
     * @returns
     */
    const getGsComponent = (item: any) => {
      const gscomponentProps = item["gscomponent"];
      if (!gscomponentProps) {
        return null;
      }
      compProps.value = gscomponentProps;
      return resolveDynamicComponent(gsGetItemCompnent(gscomponentProps.cname));
    };

    watch(compProps, () => {
      console.log("component data changed: ", compProps.value);
    });

    return () => {
      if (!component.value) {
        return null;
      }
      return h(component.value, {
        cid: compProps.value.cid,
        //gridstackitem
        gsItem: props.gsItem,
        //page props
        gsPage: props.gsPageProps,
        //component props
        gsComponent: compProps.value,
        gsLoad: props.gsLoad,
        gsSave: props.gsSave,
        gsItemChanged: props.gsItemChanged,
        gsDelete: props.gsDelete,
        gsUpload: props.gsUpload,
        gsCall: props.gsCall,
        gsRemove: props.gsRemove,
        gsRegister: props.gsRegister,
      },
      );
    };
  },
});
