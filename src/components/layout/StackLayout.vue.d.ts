import { PropType } from "vue";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { StackComponentHandlers, StackComponentRefs, StackEvent, PageProps } from "@/components/layout/StackEvent";
declare function __VLS_template(): {
    slots: {
        menu?(_: {}): any;
    };
    refs: {
        gsLayoutRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}>, {
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
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
