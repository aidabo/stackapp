import { GridStackPosition, GridStackOptions } from "gridstack";
/**
 * Page props
 * Page->Grid->GridItem->Component
 */
export interface PageProps {
    id: string;
    title: string;
    name?: string;
    static?: true;
    description?: string;
    icon?: string;
    image?: string;
    category?: string;
    status?: string;
    grids: Array<GridOptions>;
}
/**
 * Grid stack options
 */
export interface GridOptions extends GridStackOptions {
    id: string;
    items?: Array<GridItemOptions>;
}
/**
 * Grid stack item options
 */
export interface GridItemOptions extends GridStackPosition {
    id: string;
    stackComponent?: Array<CompProps>;
}
/**
 * Define component default props
 */
export interface ComponentOption {
    cid?: string;
    cname: string;
    aliasName?: string;
    description?: string;
    dataUrl?: string;
    data?: any;
    icon?: string;
    image?: string;
}
/**
 * Component options and props
 */
export interface CompProps extends ComponentOption {
    cid: string;
    cname: string;
    aliasName?: string;
    description?: string;
    dataUrl?: string;
    data?: any;
    title?: string;
}
/**
 * Create default grid options
 * @param opt
 * @returns
 */
export declare const createGridOptions: (opt?: Partial<GridOptions>) => GridOptions;
/**
 * Initial create page props
 * @param opt
 * @returns
 */
export declare const createPageProps: (opt?: Partial<PageProps>) => PageProps;
/**
 * Create a new gridstack in page
 * @returns
 */
export declare const createNewGrid: () => GridOptions;
/**
 * Create a default component props
 * @param name
 * @param description
 * @param data
 * @param dataUrl
 * @returns
 */
export declare const createComponentOption: (cname: string, description?: string, dataUrl?: string, data?: any) => ComponentOption;
export interface StackEventSourceOrTarget {
    cid: string;
    cname?: string;
    aliasName?: string;
}
/**
 * Component interactive event with page handler and other components
 */
export interface StackEvent {
    eventType?: string;
    data: any;
    srcId: string;
    targetId?: string;
    source?: StackEventSourceOrTarget | undefined;
    target?: StackEventSourceOrTarget | undefined;
}
/**
 * Create a StackEvent
 * @param cid
 * @param data
 * @param aliasName
 * @param cname
 * @param eventType
 * @returns
 */
export declare const createStackEvent: (cid: string, data: any, aliasName?: string, cname?: string, eventType?: string) => {
    cid: string;
    data: any;
    cname: string | undefined;
    aliasName: string | undefined;
    eventType: string | undefined;
};
export interface StackCompPropsHandlers {
    gsLoad: (event: StackEvent, callback?: Function) => any;
    gsSave: (event: StackEvent, callback?: Function) => any;
    gsItemChanged: (event: StackEvent, callback?: Function) => any;
    gsAny: (event: StackEvent, callback?: Function) => any;
    gsDelete?: (event: StackEvent, callback?: Function) => any;
    gsUpload?: (event: StackEvent, callback?: Function) => any;
    gsDownload?: (event: StackEvent, callback?: Function) => any;
}
/**
 * Binding props when component render
 */
export interface StackCompProps extends StackCompPropsHandlers {
    cid: string;
    gsItem: {
        [key: string]: any;
    };
    gsComponent: CompProps;
    gsPage?: PageProps;
    gsRegister: (cid: string, data: StackComponentRefs) => void;
    gsRemove: (itemId: string) => void;
    gsInvoke: (event: StackEvent, callback?: Function) => any;
    gsOptions?: Object;
}
/**
 * Provider informaiton in gridstacklayout
 */
export interface StackComponentRefs {
    props: CompProps;
    data: any;
    handlers: any;
}
export declare const createStackComponentRefs: (props: CompProps, data?: any, handlers?: any) => StackComponentRefs;
/**
 * Find and resolve function
 */
export interface StackComponentHandlers {
    fn: String;
    f: (event: StackEvent, callback?: Function) => any;
    cid: string;
    cname: string;
    aliasName: string | undefined;
}
export declare const createStackComponentHandlers: (fn: String, f: Function | undefined, cid: string, cname: string, aliasName: string | undefined) => StackComponentHandlers;
/**
 * Dynamic import component information
 */
export interface PageComponent {
    props: ComponentOption;
    component: any;
}
/**
 * Dynamic import page handler
 */
export interface PageHandler {
    name: string;
    handler: any;
}
/**
 * Dynamic store
 */
export interface PageStore {
    name: string;
    store: any;
}
export interface PageResources {
    components: Array<PageComponent>;
    handlers: Array<PageHandler>;
    stores: Array<PageStore>;
}
