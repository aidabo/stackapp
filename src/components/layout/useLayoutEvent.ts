import { ref, provide } from "vue"

export const useLayoutEvent = () =>{

    const pageHandlers = ref({})

    const __handlers = (handlers: any) => {
        pageHandlers.value = handlers
    }

    provide("__page_handlers", { __handlers });

    return { pageHandlers };
}