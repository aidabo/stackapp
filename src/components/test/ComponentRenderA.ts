//<!-- ComponentA.vue -->
import { h, defineProps, defineComponent, PropType } from "vue";
import ComponentB from "@/components/test/ComponentB.vue";
import { ComponentBProps } from "./ComponentBProps";

export const ComponentA = defineComponent({
  props: defineProps({
    bProps: {
      type: Object as PropType<ComponentBProps>,
      required: true,
    },
  }),

  setup(props: any, { slots, attrs }) {
    return () => {
      const stackSlots = slots.stack ? slots.stack() : null;

      return h(
        ComponentB,
        {
          ...props.bProps, // Pass down any props for ComponentB
          ...attrs,
          onCustomEvent: props.onCustomEvent, // Pass down event handler
        },
        {
          default: () => slots.default?.(),
          foo: () => (slots.foo ? slots.foo() : null),
          stack: stackSlots,
        }
      ); // Optionally pass slots if ComponentB supports them
    };
  },
});
