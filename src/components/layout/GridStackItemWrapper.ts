import {
  defineComponent,
  h,
  ref,
  onMounted,
  watch,
  resolveDynamicComponent,
  PropType,
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
    const gsCompProps = ref<any>();

    const gsComponent = ref<any>(null);

    /**
     * get gscomponent
     */
    const { gsGetItemCompnent, gsGetComponentInfo } = usePageComponents();
   
    onMounted(() => {
      addWidgetComponentCB(props.gsItem);
      gsComponent.value = getGsComponent(props.gsItem);
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
        const gsComponentInfo = gsGetComponentInfo(gscomponent);
        if (gsComponentInfo) {
          gsComponentInfo["cid"] = `comp_${uuidv4()}`;
        }
        item["gscomponent"] = gsComponentInfo;
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
      gsCompProps.value = gscomponentProps;
      return resolveDynamicComponent(gsGetItemCompnent(gscomponentProps.name));
    };

    watch(gsCompProps, () => {
      console.log("component data changed: ", gsCompProps.value);
    });

    return () => {
      if (!gsComponent.value) {
        return null;
      }
      return h(gsComponent.value, {
        cid: gsCompProps.value.cid,
        //gridstackitem
        gsItem: props.gsItem,
        //page props
        gsPage: props.gsPageProps,
        //component props
        gsComponent: gsCompProps.value,
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
