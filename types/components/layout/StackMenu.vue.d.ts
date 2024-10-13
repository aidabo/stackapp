declare const _default: import("vue").DefineComponent<{
    gridId: {
        type: StringConstructor;
        required: true;
    };
    lastGrid: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "grid:remove": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    gridId: {
        type: StringConstructor;
        required: true;
    };
    lastGrid: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onGrid:remove"?: ((...args: any[]) => any) | undefined;
}, {
    lastGrid: boolean;
}, {}>;
export default _default;
