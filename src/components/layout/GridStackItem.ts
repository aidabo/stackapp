import {
  h,
  defineComponent,
} from "vue";
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from "uuid";
import { usePageComponents } from "@/components/async/usePageComponents";

export interface GridStackitemProps {
  item: Object,
  onInit?: Function,
  onRemove?: Function,
  onDataChange?: Function,
  onSubmit?: Function,
}

export default defineComponent({  
  props: {
    item: Object,
    onInit: Function,
    onRemove: Function,
    onDataChange: Function,
    onSubmit: Function,
  },  

  setup(props, { emit }) {

    const addWidgetComponentCB = (item: any) => {
      const itemEl = item.el;
      const itemElContent = itemEl.querySelector(".grid-stack-item-content");
    
      //if widget added by drag or add new create button
      const newWidget = itemEl.className.match(/newWidget\s/);
      if (newWidget) {
        const gscomponent = itemElContent.getAttribute("gscomponent");
        if (!gscomponent) {
          alert(
            "No componnent info found!, newWidget must set gscomponent attrbute as component info"
          );
          return;
        }
        const gscomponentData = JSON.parse(Base64.decode(gscomponent));
        //set component data info to item to serialized to save
        item["gscomponent"] = gscomponentData;
      }
    };
  
    return function render() {

      const item = props.item as any;

      const { gsGetItemCompnent } = usePageComponents();

      //if create new widget
      addWidgetComponentCB(item);

      //get component info from item
      const gscomponentData = item["gscomponent"];
      
      //component id
      const cid = uuidv4();
      gscomponentData["cid"] = cid;

      if (!gscomponentData) {
        console.log("No componnent data found!");
        return;
      }

      let component = gsGetItemCompnent(gscomponentData.name);
      if (!component) {
        console.log("No componnent found!");
        return;
      }

      return h(component, {
        //grid stack item info
        gsItem: item,
        //component props
        gsProps: gscomponentData.props,

        onRemove: (itemId: any) => {
          //grid.removeWidget(itemEl)
          if(props.onRemove){
            props.onRemove(item.id)
          }
        },

        onInit: (props: any, gsItemData: any) => {
          if(props.onInit){
            props.onInit(props, gsItemData);
          }
        },

        onItemChanged: (props: any, gsItemData: any) => {
          console.log("stackChanged emited called", props.itemId, gsItemData);
          if(props.onDataChange){
            props.onDataChange(props, gsItemData);
          }
        },

        onSubmit: (itemId: any, gsItemData: any, result: any) => {
          if(props.onSubmit){
            props.onSubmit(props, gsItemData, result);
          }
          alert(
            "submit emited called: " + itemId + " " + JSON.stringify(gsItemData)
          );
        },
      });

    };

  }//setup

});

