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

export interface GridOptions extends GridStackOptions {
  //grid id
  id: string;
  items?: Array<GridItemOptions>;
}

export interface GridItemOptions extends GridStackPosition {
  //grid item id
  id: string;
  gscomponent?: Array<CompProps>;
}

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
 * Define component default props
 */
export interface ComponentOption {
  cid?: string; //component id, generated when in create page
  cname: string;
  aliasName?: string; //user specified unique name for component
  description?: string;
  dataUrl?: string;
  data?: any;
}

export interface GsEvent {
  cid: string;
  data: any;
  cname?: string; //component
  aliasName?: string;
  eventType?: string;
}

export const createGsEvent = (
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

/**
 * Binding props when component render
 */
export interface GsCompProps {
  //component id = gsComponent.cid
  cid: string;
  //grid-stack-item
  gsItem: { [key: string]: any };
  //component props
  gsComponent: CompProps;
  //page props
  gsPage?: PageProps;
  //load data
  gsLoad: (event: GsEvent, callback?: Function) => any;
  //save data
  gsSave: (event: GsEvent, callback?: Function) => any;
  //delete data
  gsDelete: (event: GsEvent, callback?: Function) => any;
  //item changed
  gsItemChanged: (event: GsEvent, callback?: Function) => any;
  //other event
  gsCall: (event: GsEvent, callback?: Function) => any;
  //file upload
  gsUpload?: (event: GsEvent, callback?: Function) => any;
  //register component information for page
  gsRegister: (cid: string, data: GsComponentRefs) => void;
  //when component removed, notify grid-stack
  gsRemove: (itemId: string) => void;
}

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

/**
 * Provider informaiton in gridstacklayout
 */
export interface GsComponentRefs {
  //component props
  props: CompProps;
  //component data or settings
  data: any;
  //component handlers if neccessary
  handlers: any;
}

export const createGsComponentRefs = (
  props: CompProps,
  data?: any,
  handlers?: any
) => {
  return {
    props: props,
    data: data,
    handlers: handlers,
  } as GsComponentRefs;
};

export interface GsComponentHandlers {
  fn: String;
  f: (event: GsEvent, callback?: Function) => any;
  cid: string;
  cname: string;
  aliasName: string | undefined;
}

export const createGsComponentHandlers = (
  fn: String,
  f: Function | undefined,
  cid: string,  
  cname: string,
  aliasName: string | undefined,
): GsComponentHandlers => {
  return {
    fn: fn,
    f: f as any,
    cid: cid,
    cname: cname,
    aliasName: aliasName,
  };
};
