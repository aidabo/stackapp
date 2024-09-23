import { defineComponent, h, ref, onMounted, defineExpose, watch, resolveComponent, resolveDynamicComponent } from "vue";
import { v4 as uuidv4 } from "uuid";
import { usePageComponents } from "@/components/async/usePageComponents";
import { GsComponentRefs } from "@/components/layout/GridEvent";

export default defineComponent({
  name: "GridStackItemWrapper",
  props: {
    gsItem: Object,
    //gsCompProps: Object,
    gsPageProps: Object,
    gsLoad: Function,
    gsSave: Function,
    gsRegister: Function,
    gsItemChanged: Function,
    gsRemove: Function,
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

    /**
     * Callback provided by parent to load data
     * @param event
     */
    const onLoad = (cid: string, data: any) => {
      if (props.gsLoad) {
        props.gsLoad(cid, data);
      }
    };

    /**
     * Callback provided by parent to save data to store
     * @param event
     */
    const onSave = (cid: string, data: any) => {
      if (props.gsSave) {
        props.gsSave(cid, data);
      }
    };

    /**
     * emited by gscomponent when data changed
     * @param event
     */
    const onItemChanged = (cid: string, data: any) => {
      if (props.gsItemChanged) {
        props.gsItemChanged(cid, data);
      }
    };

    /**
     * emitted by gscomponent to process removing widget work by grid-stack
     * @param event
     */
    const onRemove = () => {
      if (props.gsRemove) {
        //call removeWidget function of layout
        props.gsRemove((props.gsItem as any).el);
      }
    };

    const onRegister = (cid: string, data: GsComponentRefs) => {
      if (props.gsRegister) {
        props.gsRegister(cid, data);
      }
    };

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
          gsComponentInfo["cid"] = `comp@${uuidv4()}`;
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
        gsLoad: onLoad,
        gsSave: onSave,
        gsItemChanged: onItemChanged,
        gsRemove: onRemove,
        gsRegister: onRegister,
      });
    };
  },
});
