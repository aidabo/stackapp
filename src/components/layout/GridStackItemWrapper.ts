import { defineComponent, h, ref, onMounted, defineExpose } from "vue";
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from "uuid";
import { usePageComponents } from "@/components/async/usePageComponents";

export interface GridStackitemWrapperProps {
  gsItem: Object;
  //gsCompProps?: Object,
  gsPageProps?: Object;
  onGsLoad?: (event: any) => void;
  onGsSave?: (event: any) => void;
  onGsItemChanged?: (event: any) => void;
  onGsRemove?: (event: any) => void;
}

export default defineComponent({
  name: "GridStackItemWrapper",

  props: {
    gsItem: Object,
    //gsCompProps: Object,
    gsPageProps: Object,
    onGsLoad: Function,
    onGsSave: Function,
    onGsItemChanged: Function,
    onGsRemove: Function,
  },

  setup(props, { slots }) {
    /**
     * gscomponent reactive props
     */
    const gsCompProps = ref<any>(null);

    const gsComponent = ref<any>(null);

    /**
     * get gscomponent 
     */
    const { gsGetItemCompnent } = usePageComponents();

    /**
     * Callback provided by parent to load data
     * @param event 
     */
    const onLoad = (event: any) => {
      if (props.onGsLoad) {
        props.onGsLoad(event);
      }
    };

    /**
     * Callback provided by parent to save data to store
     * @param event 
     */
    const onSave = (event: any) => {
      if (props.onGsSave) {
        props.onGsSave(event);
      }
    };

    /**
     * emited by gscomponent when data changed 
     * @param event 
     */
    const onItemChanged = (event: any) => {
      if (props.onGsItemChanged) {
        props.onGsItemChanged(event);
      }
    };

    /**
     * Callback provided by parent when remove widget from grid-stack
     * @param event 
     */
    const onRemove = (event: any) => {
      if (props.onGsRemove) {
        props.onGsRemove(event);
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
        const gscomponentProps = JSON.parse(Base64.decode(gscomponent));
        gscomponentProps["cid"] = `comp@${uuidv4()}`;
        item["gscomponent"] = gscomponentProps;
      }
    };

    /**
     * get gscomponent and it's props definition
     * @param item 
     * @returns 
     */
    const getGsComponent = (item: any) => {
      const gscomponentProps = item["gscomponent"];
      if (!gscomponentProps) {
        return null;
      }
      gsCompProps.value = gscomponentProps;
      return gsGetItemCompnent(gscomponentProps.name);
    };

    /**
     * Expose gscomponent props, maybe page need to control it 
     */
    //defineExpose({ gsCompProps });

    return () => {
      if (!gsComponent.value) {
        console.warn("Not found gs component or component props");
        return null;
      }
      return h(gsComponent.value, {
        ...props.gsPageProps,
        "gs-comp-props": gsCompProps.value,
        onGsLoad: onLoad,
        onGsSave: onSave,
        onGsItemChanged: onItemChanged,
        onGsRemove: onRemove,
      });
    };

  },
  
});
