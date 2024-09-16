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
  gsComponents?: []; //deleted
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

export interface ComponentOption {
  //component id
  cid: string;
  name: string;
  props: any;
  description?: string;
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

export const createPageProps = (opt?: Partial<PageProps>): PageProps => {
  return {
    id: opt?.id ?? `page@${uuidv4()}`,
    title: opt?.title ?? "Create a new Page",
    static: opt?.static ?? true,
    description: opt?.description ?? opt?.title,
    icon: opt?.icon ?? "",
    image: opt?.image ?? "",
    category: opt?.category ?? "unknown",
    status: opt?.status ?? "",
    grids: [{id: `grid@${uuidv4()}`, items: []}, {id: `grid@${uuidv4()}`, items: []} ]
  } as PageProps;
};

export const createNewGrid = () =>{
  return {id: `grid@${uuidv4()}`, items: []}
}

