import {
  defineComponent,
  h,
  ref,
  onMounted,
  watch,
  Component,
} from "vue";
import { v4 as uuidv4 } from "uuid";
import { gsComponents } from "@/components/dynamic/autogenerated/GsComponents";
//import { useDynamicLoader } from "@/components/layout/DynamicLoader";

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

    //const { importComponent } = useDynamicLoader();

    /**
     * get gscomponent
     */
    //const { gsGetItemCompnent, gsGetComponentInfo } = usePageComponents();
   
    onMounted(async() => {
      await addWidgetComponentCB(props.gsItem);
      await resolveGsComponent(props.gsItem) as any;
    });

    /**
     * when creating page, drag gscomponent into page firstly
     * @param item
     */
    const addWidgetComponentCB = async(item: any) => {
      const itemEl = item.el;
      const itemElContent = itemEl.querySelector(".grid-stack-item-content");

      //if widget added by drag or add new create button
      const newWidget = itemEl.className.match(/newWidget\s/);
      if (newWidget) {
        const componentName = itemElContent.getAttribute("gscomponent");
        if (!componentName) {
          throw "No componnent info found!, newWidget must set gscomponent attrbute as component info\n <div class='newWidget ...' gscomponent=xxx>...</div>";
        }        
        const comp = gsComponents.find(gs=>gs.props.cname == componentName);
        if(comp){
          const props = comp.props;                    
          const property = typeof props === "function"? (props as Function)() : props;
          property["cid"] = `comp_${uuidv4()}`;

          const c = comp.component;
          const renderComp = typeof c === "function"? (c as Function)() : c;          
          component.value = renderComp;

          compProps.value = property;
          item["gscomponent"] = property;          
        }
      }
    };

    /**
     * Get gscomponent and it's props definition
     * @param item
     * @returns
     */
    const resolveGsComponent = async(item: any) => {
      const props = item["gscomponent"];
      if (!props) {
        return null;
      }
      compProps.value = props;
      if(!component.value){
        const comp = gsComponents.find(gs=>gs.props.cname == props.cname);
        if(!comp){
          return null;
        }
        const c = comp.component;          
        const renderComp = typeof c === "function"? c() : c;          
        component.value = renderComp;
      }
    };

    watch(compProps, () => {
      console.log("component data changed: ", compProps.value);
    });

    return () => {
      console
      if (!component.value || !compProps.value || !compProps.value.cid) {
        return null;
      }
      return h(component.value, {
        cid: compProps.value.cid,
        //component props
        gsComponent: compProps.value,
        //gridstackitem
        gsItem: props.gsItem,
        //page props
        gsPage: props.gsPageProps,
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
