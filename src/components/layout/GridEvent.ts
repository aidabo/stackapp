//import mitt, { Emitter } from "mitt";
import { v4 as uuidv4 } from "uuid";
import { GridStackPosition, GridStackOptions } from "gridstack";

export interface PageProps {
  //page id
  id: string;
  title: string;
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
  gscomponent?: Array<ComponentOption>;
  title?: string;
}

export interface CompProps extends ComponentOption {
  //component id
  cid: string; //required
  name: string;
  description?: string;
  dataUrl?:string;  
  data?: any;
}

export const createGridOptions = (opt?: Partial<GridOptions>): GridOptions => {
  return {
    id: opt?.id ?? uuidv4(),
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
  name: string;
  description?: string;
  dataUrl?: string;
  data?: any;
}

/**
 * Binding props when component render
 */
export interface GsCompProps {
  //component id = gsComponent.cid
  cid: string; 
  //grid-stack-item
  gsItem: {[key:string]: any};
  //component props
  gsComponent: CompProps;
  //page props
  gsPage?: PageProps;
  //load data
  gsLoad: (cid:string, data?: any, callback?: Function) => any;
  //save data
  gsSave: (cid: string, data: any, callback?: Function) => any;
  //delete data
  gsDelete: (cid: string, data: any, callback?: Function) => any;
  //item changed
  gsItemChanged: (cid: string, data: any, callback?: Function) => any;  
  //file upload
  gsUpload?: (cid: string, data: any, callback?: Function) => any;
  //other event
  gsOption?: (cid: string, data?: any, callback?: Function) => any;
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
  name: string,
  description?: string,
  dataUrl?: string,
  data?: any,  
): ComponentOption => {
  return {
    name: name,
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
  props: CompProps,
  //component data or settings
  data:  any
  //component handlers if neccessary
  handlers:  any
}

export const createGsComponentRefs = (props: CompProps, data?: any, handlers?: any) =>{
  return {
    props: props,
    data: data,
    handlers: handlers
  } as GsComponentRefs
}

export interface GsComponentHandlers {
  cid: string
  fn: String,
  f: (cid: string, data?: any, callback?: Function)=>any
}


