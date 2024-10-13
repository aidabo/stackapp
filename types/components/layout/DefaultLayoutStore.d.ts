import { PageProps } from "./StackEvent";
export declare const useDefaultLayoutStore: import("pinia").StoreDefinition<"defaultLayout", {
    pageList: PageProps[];
}, {
    category: (state: {
        pageList: {
            id: string;
            title: string;
            name?: string | undefined;
            static?: true | undefined;
            description?: string | undefined;
            icon?: string | undefined;
            image?: string | undefined;
            category?: string | undefined;
            status?: string | undefined;
            grids: {
                id: string;
                items?: {
                    id: string;
                    stackComponent?: {
                        cid: string;
                        cname: string;
                        aliasName?: string | undefined;
                        description?: string | undefined;
                        dataUrl?: string | undefined;
                        data?: any;
                        title?: string | undefined;
                        icon?: string | undefined;
                        image?: string | undefined;
                    }[] | undefined;
                    x?: number | undefined;
                    y?: number | undefined;
                    w?: number | undefined;
                    h?: number | undefined;
                }[] | undefined;
                acceptWidgets?: (boolean | string | ((element: Element) => boolean)) | undefined;
                alwaysShowResizeHandle?: (true | false | "mobile") | undefined;
                animate?: boolean | undefined;
                auto?: boolean | undefined;
                cellHeight?: import("gridstack").numberOrString | undefined;
                cellHeightThrottle?: number | undefined;
                cellHeightUnit?: string | undefined;
                children?: {
                    autoPosition?: boolean | undefined;
                    minW?: number | undefined;
                    maxW?: number | undefined;
                    minH?: number | undefined;
                    maxH?: number | undefined;
                    noResize?: boolean | undefined;
                    noMove?: boolean | undefined;
                    locked?: boolean | undefined;
                    id?: string | undefined;
                    content?: string | undefined;
                    sizeToContent?: (boolean | number) | undefined;
                    resizeToContentParent?: string | undefined;
                    subGridOpts?: {
                        acceptWidgets?: (boolean | string | ((element: Element) => boolean)) | undefined;
                        alwaysShowResizeHandle?: (true | false | "mobile") | undefined;
                        animate?: boolean | undefined;
                        auto?: boolean | undefined;
                        cellHeight?: import("gridstack").numberOrString | undefined;
                        cellHeightThrottle?: number | undefined;
                        cellHeightUnit?: string | undefined;
                        children?: any[] | undefined;
                        column?: (number | "auto") | undefined;
                        columnOpts?: {
                            columnWidth?: number | undefined;
                            columnMax?: number | undefined;
                            breakpoints?: {
                                w?: number | undefined;
                                c: number;
                                layout?: import("gridstack").ColumnOptions | undefined;
                            }[] | undefined;
                            breakpointForWindow?: boolean | undefined;
                            layout?: import("gridstack").ColumnOptions | undefined;
                        } | undefined;
                        class?: string | undefined;
                        disableDrag?: boolean | undefined;
                        disableResize?: boolean | undefined;
                        draggable?: {
                            handle?: string | undefined;
                            appendTo?: string | undefined;
                            pause?: (boolean | number) | undefined;
                            scroll?: boolean | undefined;
                            cancel?: string | undefined;
                        } | undefined;
                        engineClass?: typeof import("gridstack").GridStackEngine | undefined;
                        float?: boolean | undefined;
                        handle?: string | undefined;
                        handleClass?: string | undefined;
                        itemClass?: string | undefined;
                        margin?: import("gridstack").numberOrString | undefined;
                        marginTop?: import("gridstack").numberOrString | undefined;
                        marginRight?: import("gridstack").numberOrString | undefined;
                        marginBottom?: import("gridstack").numberOrString | undefined;
                        marginLeft?: import("gridstack").numberOrString | undefined;
                        marginUnit?: string | undefined;
                        maxRow?: number | undefined;
                        minRow?: number | undefined;
                        nonce?: string | undefined;
                        placeholderClass?: string | undefined;
                        placeholderText?: string | undefined;
                        resizable?: {
                            autoHide?: boolean | undefined;
                            handles?: string | undefined;
                        } | undefined;
                        removable?: (boolean | string) | undefined;
                        removableOptions?: {
                            accept?: string | undefined;
                            decline?: string | undefined;
                        } | undefined;
                        row?: number | undefined;
                        rtl?: (boolean | "auto") | undefined;
                        sizeToContent?: boolean | undefined;
                        staticGrid?: boolean | undefined;
                        styleInHead?: boolean | undefined;
                        subGridOpts?: any | undefined;
                        subGridDynamic?: boolean | undefined;
                    } | undefined;
                    x?: number | undefined;
                    y?: number | undefined;
                    w?: number | undefined;
                    h?: number | undefined;
                }[] | undefined;
                column?: (number | "auto") | undefined;
                columnOpts?: {
                    columnWidth?: number | undefined;
                    columnMax?: number | undefined;
                    breakpoints?: {
                        w?: number | undefined;
                        c: number;
                        layout?: import("gridstack").ColumnOptions | undefined;
                    }[] | undefined;
                    breakpointForWindow?: boolean | undefined;
                    layout?: import("gridstack").ColumnOptions | undefined;
                } | undefined;
                class?: string | undefined;
                disableDrag?: boolean | undefined;
                disableResize?: boolean | undefined;
                draggable?: {
                    handle?: string | undefined;
                    appendTo?: string | undefined;
                    pause?: (boolean | number) | undefined;
                    scroll?: boolean | undefined;
                    cancel?: string | undefined;
                } | undefined;
                engineClass?: typeof import("gridstack").GridStackEngine | undefined;
                float?: boolean | undefined;
                handle?: string | undefined;
                handleClass?: string | undefined;
                itemClass?: string | undefined;
                margin?: import("gridstack").numberOrString | undefined;
                marginTop?: import("gridstack").numberOrString | undefined;
                marginRight?: import("gridstack").numberOrString | undefined;
                marginBottom?: import("gridstack").numberOrString | undefined;
                marginLeft?: import("gridstack").numberOrString | undefined;
                marginUnit?: string | undefined;
                maxRow?: number | undefined;
                minRow?: number | undefined;
                nonce?: string | undefined;
                placeholderClass?: string | undefined;
                placeholderText?: string | undefined;
                resizable?: {
                    autoHide?: boolean | undefined;
                    handles?: string | undefined;
                } | undefined;
                removable?: (boolean | string) | undefined;
                removableOptions?: {
                    accept?: string | undefined;
                    decline?: string | undefined;
                } | undefined;
                row?: number | undefined;
                rtl?: (boolean | "auto") | undefined;
                sizeToContent?: boolean | undefined;
                staticGrid?: boolean | undefined;
                styleInHead?: boolean | undefined;
                subGridOpts?: {
                    acceptWidgets?: (boolean | string | ((element: Element) => boolean)) | undefined;
                    alwaysShowResizeHandle?: (true | false | "mobile") | undefined;
                    animate?: boolean | undefined;
                    auto?: boolean | undefined;
                    cellHeight?: import("gridstack").numberOrString | undefined;
                    cellHeightThrottle?: number | undefined;
                    cellHeightUnit?: string | undefined;
                    children?: any[] | undefined;
                    column?: (number | "auto") | undefined;
                    columnOpts?: {
                        columnWidth?: number | undefined;
                        columnMax?: number | undefined;
                        breakpoints?: {
                            w?: number | undefined;
                            c: number;
                            layout?: import("gridstack").ColumnOptions | undefined;
                        }[] | undefined;
                        breakpointForWindow?: boolean | undefined;
                        layout?: import("gridstack").ColumnOptions | undefined;
                    } | undefined;
                    class?: string | undefined;
                    disableDrag?: boolean | undefined;
                    disableResize?: boolean | undefined;
                    draggable?: {
                        handle?: string | undefined;
                        appendTo?: string | undefined;
                        pause?: (boolean | number) | undefined;
                        scroll?: boolean | undefined;
                        cancel?: string | undefined;
                    } | undefined;
                    engineClass?: typeof import("gridstack").GridStackEngine | undefined;
                    float?: boolean | undefined;
                    handle?: string | undefined;
                    handleClass?: string | undefined;
                    itemClass?: string | undefined;
                    margin?: import("gridstack").numberOrString | undefined;
                    marginTop?: import("gridstack").numberOrString | undefined;
                    marginRight?: import("gridstack").numberOrString | undefined;
                    marginBottom?: import("gridstack").numberOrString | undefined;
                    marginLeft?: import("gridstack").numberOrString | undefined;
                    marginUnit?: string | undefined;
                    maxRow?: number | undefined;
                    minRow?: number | undefined;
                    nonce?: string | undefined;
                    placeholderClass?: string | undefined;
                    placeholderText?: string | undefined;
                    resizable?: {
                        autoHide?: boolean | undefined;
                        handles?: string | undefined;
                    } | undefined;
                    removable?: (boolean | string) | undefined;
                    removableOptions?: {
                        accept?: string | undefined;
                        decline?: string | undefined;
                    } | undefined;
                    row?: number | undefined;
                    rtl?: (boolean | "auto") | undefined;
                    sizeToContent?: boolean | undefined;
                    staticGrid?: boolean | undefined;
                    styleInHead?: boolean | undefined;
                    subGridOpts?: any | undefined;
                    subGridDynamic?: boolean | undefined;
                } | undefined;
                subGridDynamic?: boolean | undefined;
            }[];
        }[];
    } & import("pinia").PiniaCustomStateProperties<{
        pageList: PageProps[];
    }>) => (pageId: string) => {
        id: string;
        title: string;
        name?: string | undefined;
        static?: true | undefined;
        description?: string | undefined;
        icon?: string | undefined;
        image?: string | undefined;
        category?: string | undefined;
        status?: string | undefined;
        grids: {
            id: string;
            items?: {
                id: string;
                stackComponent?: {
                    cid: string;
                    cname: string;
                    aliasName?: string | undefined;
                    description?: string | undefined;
                    dataUrl?: string | undefined;
                    data?: any;
                    title?: string | undefined;
                    icon?: string | undefined;
                    image?: string | undefined;
                }[] | undefined;
                x?: number | undefined;
                y?: number | undefined;
                w?: number | undefined;
                h?: number | undefined;
            }[] | undefined;
            acceptWidgets?: (boolean | string | ((element: Element) => boolean)) | undefined;
            alwaysShowResizeHandle?: (true | false | "mobile") | undefined;
            animate?: boolean | undefined;
            auto?: boolean | undefined;
            cellHeight?: import("gridstack").numberOrString | undefined;
            cellHeightThrottle?: number | undefined;
            cellHeightUnit?: string | undefined;
            children?: {
                autoPosition?: boolean | undefined;
                minW?: number | undefined;
                maxW?: number | undefined;
                minH?: number | undefined;
                maxH?: number | undefined;
                noResize?: boolean | undefined;
                noMove?: boolean | undefined;
                locked?: boolean | undefined;
                id?: string | undefined;
                content?: string | undefined;
                sizeToContent?: (boolean | number) | undefined;
                resizeToContentParent?: string | undefined;
                subGridOpts?: {
                    acceptWidgets?: (boolean | string | ((element: Element) => boolean)) | undefined;
                    alwaysShowResizeHandle?: (true | false | "mobile") | undefined;
                    animate?: boolean | undefined;
                    auto?: boolean | undefined;
                    cellHeight?: import("gridstack").numberOrString | undefined;
                    cellHeightThrottle?: number | undefined;
                    cellHeightUnit?: string | undefined;
                    children?: any[] | undefined;
                    column?: (number | "auto") | undefined;
                    columnOpts?: {
                        columnWidth?: number | undefined;
                        columnMax?: number | undefined;
                        breakpoints?: {
                            w?: number | undefined;
                            c: number;
                            layout?: import("gridstack").ColumnOptions | undefined;
                        }[] | undefined;
                        breakpointForWindow?: boolean | undefined;
                        layout?: import("gridstack").ColumnOptions | undefined;
                    } | undefined;
                    class?: string | undefined;
                    disableDrag?: boolean | undefined;
                    disableResize?: boolean | undefined;
                    draggable?: {
                        handle?: string | undefined;
                        appendTo?: string | undefined;
                        pause?: (boolean | number) | undefined;
                        scroll?: boolean | undefined;
                        cancel?: string | undefined;
                    } | undefined;
                    engineClass?: typeof import("gridstack").GridStackEngine | undefined;
                    float?: boolean | undefined;
                    handle?: string | undefined;
                    handleClass?: string | undefined;
                    itemClass?: string | undefined;
                    margin?: import("gridstack").numberOrString | undefined;
                    marginTop?: import("gridstack").numberOrString | undefined;
                    marginRight?: import("gridstack").numberOrString | undefined;
                    marginBottom?: import("gridstack").numberOrString | undefined;
                    marginLeft?: import("gridstack").numberOrString | undefined;
                    marginUnit?: string | undefined;
                    maxRow?: number | undefined;
                    minRow?: number | undefined;
                    nonce?: string | undefined;
                    placeholderClass?: string | undefined;
                    placeholderText?: string | undefined;
                    resizable?: {
                        autoHide?: boolean | undefined;
                        handles?: string | undefined;
                    } | undefined;
                    removable?: (boolean | string) | undefined;
                    removableOptions?: {
                        accept?: string | undefined;
                        decline?: string | undefined;
                    } | undefined;
                    row?: number | undefined;
                    rtl?: (boolean | "auto") | undefined;
                    sizeToContent?: boolean | undefined;
                    staticGrid?: boolean | undefined;
                    styleInHead?: boolean | undefined;
                    subGridOpts?: any | undefined;
                    subGridDynamic?: boolean | undefined;
                } | undefined;
                x?: number | undefined;
                y?: number | undefined;
                w?: number | undefined;
                h?: number | undefined;
            }[] | undefined;
            column?: (number | "auto") | undefined;
            columnOpts?: {
                columnWidth?: number | undefined;
                columnMax?: number | undefined;
                breakpoints?: {
                    w?: number | undefined;
                    c: number;
                    layout?: import("gridstack").ColumnOptions | undefined;
                }[] | undefined;
                breakpointForWindow?: boolean | undefined;
                layout?: import("gridstack").ColumnOptions | undefined;
            } | undefined;
            class?: string | undefined;
            disableDrag?: boolean | undefined;
            disableResize?: boolean | undefined;
            draggable?: {
                handle?: string | undefined;
                appendTo?: string | undefined;
                pause?: (boolean | number) | undefined;
                scroll?: boolean | undefined;
                cancel?: string | undefined;
            } | undefined;
            engineClass?: typeof import("gridstack").GridStackEngine | undefined;
            float?: boolean | undefined;
            handle?: string | undefined;
            handleClass?: string | undefined;
            itemClass?: string | undefined;
            margin?: import("gridstack").numberOrString | undefined;
            marginTop?: import("gridstack").numberOrString | undefined;
            marginRight?: import("gridstack").numberOrString | undefined;
            marginBottom?: import("gridstack").numberOrString | undefined;
            marginLeft?: import("gridstack").numberOrString | undefined;
            marginUnit?: string | undefined;
            maxRow?: number | undefined;
            minRow?: number | undefined;
            nonce?: string | undefined;
            placeholderClass?: string | undefined;
            placeholderText?: string | undefined;
            resizable?: {
                autoHide?: boolean | undefined;
                handles?: string | undefined;
            } | undefined;
            removable?: (boolean | string) | undefined;
            removableOptions?: {
                accept?: string | undefined;
                decline?: string | undefined;
            } | undefined;
            row?: number | undefined;
            rtl?: (boolean | "auto") | undefined;
            sizeToContent?: boolean | undefined;
            staticGrid?: boolean | undefined;
            styleInHead?: boolean | undefined;
            subGridOpts?: {
                acceptWidgets?: (boolean | string | ((element: Element) => boolean)) | undefined;
                alwaysShowResizeHandle?: (true | false | "mobile") | undefined;
                animate?: boolean | undefined;
                auto?: boolean | undefined;
                cellHeight?: import("gridstack").numberOrString | undefined;
                cellHeightThrottle?: number | undefined;
                cellHeightUnit?: string | undefined;
                children?: any[] | undefined;
                column?: (number | "auto") | undefined;
                columnOpts?: {
                    columnWidth?: number | undefined;
                    columnMax?: number | undefined;
                    breakpoints?: {
                        w?: number | undefined;
                        c: number;
                        layout?: import("gridstack").ColumnOptions | undefined;
                    }[] | undefined;
                    breakpointForWindow?: boolean | undefined;
                    layout?: import("gridstack").ColumnOptions | undefined;
                } | undefined;
                class?: string | undefined;
                disableDrag?: boolean | undefined;
                disableResize?: boolean | undefined;
                draggable?: {
                    handle?: string | undefined;
                    appendTo?: string | undefined;
                    pause?: (boolean | number) | undefined;
                    scroll?: boolean | undefined;
                    cancel?: string | undefined;
                } | undefined;
                engineClass?: typeof import("gridstack").GridStackEngine | undefined;
                float?: boolean | undefined;
                handle?: string | undefined;
                handleClass?: string | undefined;
                itemClass?: string | undefined;
                margin?: import("gridstack").numberOrString | undefined;
                marginTop?: import("gridstack").numberOrString | undefined;
                marginRight?: import("gridstack").numberOrString | undefined;
                marginBottom?: import("gridstack").numberOrString | undefined;
                marginLeft?: import("gridstack").numberOrString | undefined;
                marginUnit?: string | undefined;
                maxRow?: number | undefined;
                minRow?: number | undefined;
                nonce?: string | undefined;
                placeholderClass?: string | undefined;
                placeholderText?: string | undefined;
                resizable?: {
                    autoHide?: boolean | undefined;
                    handles?: string | undefined;
                } | undefined;
                removable?: (boolean | string) | undefined;
                removableOptions?: {
                    accept?: string | undefined;
                    decline?: string | undefined;
                } | undefined;
                row?: number | undefined;
                rtl?: (boolean | "auto") | undefined;
                sizeToContent?: boolean | undefined;
                staticGrid?: boolean | undefined;
                styleInHead?: boolean | undefined;
                subGridOpts?: any | undefined;
                subGridDynamic?: boolean | undefined;
            } | undefined;
            subGridDynamic?: boolean | undefined;
        }[];
    } | undefined;
}, {
    getPageList(): Promise<any>;
    getPageById(pageId: string): Promise<any>;
    exists(pageId: string): Promise<boolean>;
    savePage(data: PageProps): Promise<any>;
    insertPage(data: PageProps): Promise<any>;
    updatePage(data: PageProps): Promise<any>;
    deletePage(pageId: string): Promise<any>;
}>;
