//import mitt, { Emitter } from "mitt";
import { v4 as uuidv4 } from "uuid";
import { GridStackPosition, GridStackOptions } from "gridstack";

/**
 * Page props
 * Page->Grid->GridItem->Component
 */
export interface PageProps {
  //page id
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
  //grid id
  id: string;
  items?: Array<GridItemOptions>;
}

/**
 * Grid stack item options
 */
export interface GridItemOptions extends GridStackPosition {
  //grid item id
  id: string;
  stackComponent?: Array<CompProps>;
}

/**
 * Define component default props
 */
export interface ComponentOption {
  cid?: string; //component id, generated when in create page
  cname: string;
  aliasName?: string; //user specified unique name for component
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
  //component id
  cid: string; //required
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
export const createGridOptions = (opt?: Partial<GridOptions>): GridOptions => {
  return {
    id: opt?.id ?? `grid_${uuidv4()}`,
    column: opt?.column ?? 12,
    float: opt?.float ?? false,
    cellHeight: opt?.cellHeight ?? 70,
    items: opt?.items ?? [],
  } as GridOptions;
};

/**
 * Initial create page props
 * @param opt
 * @returns
 */
export const createPageProps = (opt?: Partial<PageProps>): PageProps => {
  return {
    id: opt?.id ?? `page_${uuidv4()}`,
    name: opt?.name,
    title: opt?.title ?? "Create a new Page",
    static: opt?.static ?? true,
    description: opt?.description ?? opt?.title,
    icon: opt?.icon ?? "",
    image: opt?.image ?? "",
    category: opt?.category ?? "unknown",
    status: opt?.status ?? "",
    grids: [
      { id: `grid_${uuidv4()}`, items: [] },
      { id: `grid_${uuidv4()}`, items: [] },
    ],
  } as PageProps;
};

/**
 * Create a new gridstack in page
 * @returns
 */
export const createNewGrid = (): GridOptions => {
  return { id: `grid_${uuidv4()}`, items: [] } as GridOptions;
};

/**
 * Create a default component props
 * @param name
 * @param description
 * @param data
 * @param dataUrl
 * @returns
 */
export const createComponentOption = (
  cname: string,
  description?: string,
  dataUrl?: string,
  data?: any
): ComponentOption => {
  return {
    cname: cname,
    description: description,
    dataUrl: dataUrl,
    data: data,
  } as ComponentOption;
};

export interface StackEventSourceOrTarget {
  cid: string;        //component id in page
  cname?: string;     //component
  aliasName?: string; //unique name used specified
}

/**
 * Component interactive event with page handler and other components
 */
export interface StackEvent {
  eventType?: string;
  data: any
  srcId: string;  
  targetId?: string;
  source?: StackEventSourceOrTarget | undefined,
  target?: StackEventSourceOrTarget | undefined,
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
export const createStackEvent = (
  cid: string,
  data: any,
  aliasName?: string,
  cname?: string,
  eventType?: string
) => {
  return {
    cid: cid,
    data: data,
    cname: cname, //component
    aliasName: aliasName, //user specified unique name for component
    eventType: eventType,
  };
};

export interface StackCompPropsHandlers {
  //load data
  gsLoad: (event: StackEvent, callback?: Function) => any;
  //save data
  gsSave: (event: StackEvent, callback?: Function) => any;
  //item changed
  gsItemChanged: (event: StackEvent, callback?: Function) => any;
  //other event
  gsAny: (event: StackEvent, callback?: Function) => any;
  //delete data
  gsDelete?: (event: StackEvent, callback?: Function) => any;
  //file upload
  gsUpload?: (event: StackEvent, callback?: Function) => any;
  //file download
  gsDownload?: (event: StackEvent, callback?: Function) => any;
}

/**
 * Binding props when component render
 */
export interface StackCompProps extends StackCompPropsHandlers {
  //component id = StackComponent.cid
  cid: string;
  //grid-stack-item
  gsItem: { [key: string]: any };
  //component props
  gsComponent: CompProps;
  //page props
  gsPage?: PageProps;
  //register callback
  gsRegister: (cid: string, data: StackComponentRefs) => void;
  //when component removed, notify grid-stack
  gsRemove: (itemId: string) => void; 
  //invoke function in component 
  gsInvoke: (event: StackEvent, callback?: Function) => any;
  //other objects in PageHandler excluded StackCompPropsHandlers
  gsOptions?: Object;
}

/**
 * Provider informaiton in gridstacklayout
 */
export interface StackComponentRefs {
  //component props
  props: CompProps;
  //component data or settings
  data: any;
  //Component callback functions registered by gsRegister function in component props, 
  //This callback called by page handler invoke
  handlers: any;
}

export const createStackComponentRefs = (
  props: CompProps,
  data?: any,
  handlers?: any
) => {
  return {
    props: props,
    data: data,
    handlers: handlers,
  } as StackComponentRefs;
};

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

export const createStackComponentHandlers = (
  fn: String,
  f: Function | undefined,
  cid: string,  
  cname: string,
  aliasName: string | undefined,
): StackComponentHandlers => {
  return {
    fn: fn,
    f: f as any,
    cid: cid,
    cname: cname,
    aliasName: aliasName,
  };
};

//for Auto-generated source's interface
//-------------------------------------

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
  name: string,
  handler: any
}

/**
 * Dynamic store
 */
export interface PageStore {
  name: string,
  store: any
}

export interface PageResources {
  components: Array<PageComponent>,
  handlers: Array<PageHandler>,
  stores: Array<PageStore>,
}



