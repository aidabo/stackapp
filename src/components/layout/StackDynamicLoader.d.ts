import { StackLayoutOptions } from "./StackLayoutConfig";
export declare function useDynamicLoader(): {
    imports: (config: StackLayoutOptions) => Promise<StackLayoutOptions>;
};
