declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    gridId: {
        type: StringConstructor;
        required: true;
    };
    lastGrid: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
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
}>> & Readonly<{
    "onGrid:remove"?: ((...args: any[]) => any) | undefined;
}>, {
    lastGrid: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
