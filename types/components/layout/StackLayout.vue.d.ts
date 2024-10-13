import { PropType } from "vue";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { StackComponentHandlers, StackComponentRefs, StackEvent, PageProps } from "@/components/layout/StackEvent";
declare function __VLS_template(): {
    menu?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        required: true;
    };
    pageProps: {
        type: PropType<PageProps>;
        required: true;
    };
    pageStatic: {
        type: BooleanConstructor;
        required: true;
    };
}, {
    props: {
        readonly id: string;
        readonly pageProps: PageProps;
        readonly pageStatic: boolean;
    };
    components: {
        [key: string]: StackComponentRefs;
    };
    findCompFn: (fn: string, event: StackEvent) => StackComponentHandlers[];
    load: (serializedData: any) => any;
    save: () => any;
    clear: () => void;
    float: (value: boolean) => void;
    compact: (value: boolean) => void;
    destroyGrid: (gridId: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: true;
    };
    pageProps: {
        type: PropType<PageProps>;
        required: true;
    };
    pageStatic: {
        type: BooleanConstructor;
        required: true;
    };
}>>, {}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;

type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
