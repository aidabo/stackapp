import { GridOptions, StackEvent } from "./StackEvent";
declare const _default: import("vue").DefineComponent<{}, {
    showInfo: () => void;
    load: (_grids: Array<GridOptions>) => Promise<void>;
    save: (isPublish?: boolean) => Promise<void>;
    clear: () => Promise<void>;
    preview: () => Promise<void>;
    publish: () => Promise<void>;
    invoke: (fn: string, event: StackEvent, callback?: Function) => Promise<any[]>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
