import { defineComponent, h, ref, onMounted, watch, Component } from "vue";
import { v4 as uuidv4 } from "uuid";
import { CompProps, PageComponent } from "./StackEvent";

export default defineComponent({
  name: "GridStackItemWrapper",
  props: {
    gsItem: Object,
    //StackCompProps: Object,
    gsPageProps: Object,
    gsRegister: Function,
    gsRemove: Function,
    gsHandlers: Object,
    gsInvoke: Function,
    gsOptions: Object,
    components: Array<PageComponent>,
  },

  setup(props, { slots, emit }) {

    const compProps = ref<CompProps>();

    const component = ref<Component>();

    onMounted(async () => {
      await addWidgetComponentCB(props.gsItem);
      (await resolveStackComponent(props.gsItem)) as any;
    });

    /**
     * when creating page, drag StackComponent into page firstly
     * @param item
     */
    const addWidgetComponentCB = async (item: any) => {
      const itemEl = item.el;
      const itemElContent = itemEl.querySelector(".grid-stack-item-content");

      //if widget added by drag or add new create button
      const newWidget = itemEl.className.match(/newWidget\s/);
      if (newWidget) {
        const componentName = itemElContent.getAttribute("stackComponent");
        if (!componentName) {
          throw "No componnent info found!, newWidget must set StackComponent attrbute as component info\n <div class='newWidget ...' StackComponent=xxx>...</div>";
        }
        //const { importComponent} = useDynamicLoader();
        //const comp = await importComponent(config, componentName) as any;
        const comp = props.components?.find(
          (gs) => gs.props.cname == componentName
        );
        if (comp) {
          const props = comp.props;
          const property =
            typeof props === "function" ? (props as Function)() : props;
          property["cid"] = `comp_${uuidv4()}`;

          const c = comp.component;
          const renderComp = typeof c === "function" ? (c as Function)() : c;
          component.value = renderComp;

          compProps.value = property;
          //see: GridItemOptions
          item["stackComponent"] = property;
        }
      }
    };

    /**
     * Get StackComponent and it's props definition
     * @param item
     * @returns
     */
    const resolveStackComponent = async (item: any) => {
      //see: GridItemOptions
      const propInfo = item["stackComponent"];
      if (!propInfo) {
        return null;
      }
      compProps.value = propInfo;
      if (!component.value) {
        const comp = props.components?.find(
          (gs) => gs.props.cname == compProps.value?.cname
        );
        if (!comp) {
          return null;
        }
        const c = comp.component;
        const renderComp = typeof c === "function" ? c() : c;
        component.value = renderComp;
      }
    };

    watch(compProps, () => {
      console.log("component data changed: ", compProps.value);
    });

    return () => {      
      if (!component.value || !compProps.value || !compProps.value.cid) {
        return null;
      }

      // const scopedSlots = {  
      //   default: () => h('div', slots.default?.({ props })),  
      //   title: () => (slots.title ? h('div', slots.title({ props })) : null),  
      //   stack: () => (slots.stack ? h('div', slots.stack({ props })) : null),          
      // };  
  
      return h(component.value, {
        cid: compProps.value.cid,
        //component props
        gsComponent: compProps.value,
        //gridstackitem
        gsItem: props.gsItem,
        //page props
        gsPage: props.gsPageProps,
        gsRemove: props.gsRemove,
        gsRegister: props.gsRegister,
        ...props.gsHandlers,
        gsInvoke: props.gsInvoke,
        gsOptions: props.gsOptions,
      }, /*scopedSlots*/);
    };
  },
});


// <script setup>  
// import { h, defineComponent } from 'vue';  
// import MyComponent from './MyComponent.vue';  
  
// // 假设你有一些数据和方法想要传递给插槽  
// const stackData = { /* ... */ };  
// const handleStackAction = () => { /* ... */ };  
  
// export default defineComponent({  
//   name: 'ParentComponent',  
//   setup(_, { slots }) {  
//     // 渲染函数  
//     return () => {  
//       // 渲染 MyComponent 并传递一个名为 'stack' 的作用域插槽  
//       // 注意：slots.stack 是一个函数，它接受一个对象作为参数并返回 VNode 或 VNode 数组  
//       const stackSlotContent = slots.stack?.({ stackData, handleStackAction });  
  
//       // 创建一个包含插槽内容的 div  
//       return h('div', { class: 'justify-center m-5' }, [  
//         // 如果 stackSlotContent 存在，则渲染它  
//         stackSlotContent ? stackSlotContent : null,  
//         // 其他内容，比如你的 span  
//         h('span', { class: 'text-red-400 font-bold' }, 'this is slot stack outside scoped content')  
//       ]);  
//     };  
//   }  
// });  
// </script>