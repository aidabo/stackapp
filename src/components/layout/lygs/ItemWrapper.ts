import {
  h,
  defineComponent,
} from "vue";
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from "uuid";
import { usePageComponents } from "../shared/usePageComponents";

const addWidgetComponentCB = (item: any) => {
  const itemEl = item.el;
  const itemElContent = itemEl.querySelector(".grid-stack-item-content");

  //if widget added by drag or add button
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

export default defineComponent({
  props: {
    item: Object,
    itemId: String,
  },  

  setup(props, { emit }) {

    return function render() {

      const item = props.item as any;
      let itemId = item.id;

      const { gsGetItemCompnent, gsComponentData } = usePageComponents();

      //if create new widget
      addWidgetComponentCB(item);

      //get component info from item
      const gscomponentData = item["gscomponent"];
      //custom id
      const cid = uuidv4();
      gscomponentData["cid"] = cid;
      //gs item id
      gscomponentData["id"] = itemId;

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
        itemId: "" + itemId,
        cid: cid,
        gsProps: gscomponentData.props,
        gsInitData: gscomponentData.data,

        onRemove: (itemId: any) => {
          //grid.removeWidget(itemEl)
        },

        onItemChanged: (props: any, gsItemData: any) => {
          console.log("stackChanged emited called", props.itemId, gsItemData);
          gscomponentData["data"] = gsItemData;
        },

        onSubmit: (itemId: any, gsItemData: any) => {
          alert(
            "submit emited called: " + itemId + " " + JSON.stringify(gsItemData)
          );
        },
      });

    };

  }//setup

});

/*
export default {
  setup() {
    const msg = 'Hello!'

    return function render() {
      // has access to everything inside setup() scope
      return h('div', msg)
    }
  }
}
*/
