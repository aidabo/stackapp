import { PageProps } from "@/components/layout/StackEvent";
export declare const useDefaultLayoutStore: () => {
    getPageList: () => Promise<PageProps[] | boolean>;
    getPageById: (pageId: string) => Promise<PageProps | boolean>;
    savePage: (data: PageProps) => Promise<PageProps | boolean>;
    insertPage: (data: PageProps) => Promise<PageProps | boolean>;
    updatePage: (data: PageProps) => Promise<PageProps | boolean>;
    deletePage: (pageId: string) => Promise<PageProps | boolean>;
};
