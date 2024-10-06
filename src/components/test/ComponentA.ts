import { h, ref, defineComponent, PropType, reactive } from "vue";
import { ComponentBProps } from "./ComponentBProps";
import { v4 as uuidv4 } from "uuid";
import { Base64 } from "js-base64";

export default defineComponent({  
  props: {
    bProps: Object as any,
    onLoad: Function,
    onSave: Function,
    onItemChanged: Function,
  },

  setup(props, { slots }) {

    const bProps: ComponentBProps = reactive({
        id: uuidv4(),
        name: Base64.encode(uuidv4()),
        description: "test component b prop",
        data: { name: "aidabo" },
        storeUrl: "http://localhost",
      });
      
      const onLoad = (id: string) => {
        alert("onload callback:  " + id);
        return { id: id, data: { content: "This is data loaded" } };
      };
      
      const onSave = (event: any) => {
        const [form, data] = event;
        myform.value = form;
        mydata.value = data;
        alert("onSave event callback: " + JSON.stringify(event));
      };
      
      const myform = ref({});
      const mydata = ref({});
      
      const onItemChanged = (event: any) => {
        const [form, data] = event;
        myform.value = form;
        mydata.value = data;
      };

    return () => h(
      'component-b',
      {
        bProps: props.bProps,
        onLoad: props.onLoad,
        onSave: props.onSave,
        onGriditemItemChanged: props.onItemChanged,
      },
      {
        stack: () => h('div', { class: 'justify-center m-5' }, [
          h('span', { class: 'text-red-400 font-bold' }, 'this is slot stack')
        ]),
        foo: () => h('div', { class: 'justify-center m-5' }, [
          h('span', { class: 'text-cyan-400 font-bold' }, 'this is slot stack')
        ]),
        default: () => h('div', { class: 'justify-center m-5' }, [
          h('span', { class: 'text-green-400 font-bold' }, 'this is default slot')
        ])
      }
    );
  }
});

