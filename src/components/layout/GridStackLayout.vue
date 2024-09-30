<template>
  <div class="full-w p-1 page">
    <div
      ref="gsLayoutRef"
      :id="id"
      class="grid-stack"
      :class="{ editable: pageStatic == false }"
    >
      <slot name="menu"></slot>
      <div v-if="!pageStatic" class="drag-to-here">Drag to here</div>
    </div>
    <hr />
    <div></div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  h,
  render,
  ref,
  defineExpose,
  watch,
  onUnmounted,
  reactive,
  inject,
  PropType,
} from "vue";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { GridStack } from "gridstack";
import { v4 as uuidv4 } from "uuid";
import GridStackItemWrapper from "@/components/layout/GridStackItemWrapper";
import GridStackItemDynamic from "@/components/layout/GridStackItemDynamic";
import {
  createGsComponentHandlers,
  GsComponentHandlers,
  GsComponentRefs,
  GsEvent,
  PageProps,
} from "@/components/layout/GridEvent";

const gsLayoutRef = ref(null);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  pageProps: {
    type: Object as PropType<PageProps>,
    required: true,
  },
  pageStatic: {
    type: Boolean,
    required: true,
  },
});

const handlers: any = inject("__page_handlers");
console.log("injected", handlers);

const components = reactive<{ [key: string]: GsComponentRefs }>({});

var grid: any = null; // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115

onMounted(async () => {
  //@ts-ignore
  // let el: HTMLElement =
  //   document.getElementById(props.id) || document.querySelector(".grid-stack");
  grid = GridStack.init(
    {
      // DO NOT user grid.value = GridStack.init(), see above
      //float: true,
      cellHeight: "25",
      minRow: 5,
      acceptWidgets: true,
      removable: "#trash", // drag-out delete class
      columnOpts: {
        breakpointForWindow: true, // test window vs grid size
        breakpoints: [
          { w: 700, c: 1 },
          { w: 850, c: 3 },
          { w: 950, c: 6 },
          { w: 1100, c: 8 },
        ],
      },
      // animate: false, // show immediate (animate: true is nice for user dragging though)
      // columnOpts: {
      //   columnWidth: 300, // wanted width
      // },
    },
    gsLayoutRef.value as any
    //el
  );

  grid.setStatic(props.pageStatic ?? false);

  GridStack.setupDragIn(".newWidget", { appendTo: "body", helper: "clone" });

  //re-layout pattern: moveScale, move, scale, list, compact, none
  grid.opts.columnOpts.layout = "list";

  //debug
  //addEvents(grid);

  grid.on("added", function (event: any, items: any) {
    for (const item of items) {
      const itemEl = item.el;
      const itemElContent = itemEl.querySelector(".grid-stack-item-content");
      if (!item.id && item._id) {
        item.id = item._id;
      } else if (!item.id && !item._id) {
        item.id = item._id = uuidv4();
      }

      // Use Vue's render function to create the content
      // See https://vuejs.org/guide/extras/render-function.html#render-functions-jsx
      //      Supports: emit, slots, props, attrs, see onRemove event below

      //remove dragitem custom class to remove drag item background style
      itemEl.className = itemEl.className.replace(/grid\-custom/, "");

      //const itemContentVNode: any = h(GridStackItem, { item: item });
      const itemContentVNode: any = h(GridStackItemDynamic, {
        gsItem: item,
        gsPageProps: props.pageProps,
        gsLoad: handlers.loadHandler,
        gsSave: handlers.saveHandler,
        gsItemChanged: handlers.itemChangedHandler,
        gsUpload: handlers.uploadHandler,
        gsDelete: handlers.deleteHandler,
        gsCall: handlers.callHandler,
        gsRegister: onCompRegister,
        gsRemove: removeWidget,        
      });
  
      //clear dragged element content from .grid-stack-item-content div
      itemElContent.innerHTML = "";

      // Render the vue node into the item element
      render(itemContentVNode, itemElContent);
    }
  });

  grid.on("removed", function (event: any, items: any) {
    for (const item of items) {
      const itemEl = item.el;
      const itemElContent = itemEl.querySelector(".grid-stack-item-content");
      // Unmount the vue node from the item element
      // Calling render with null will allow vue to clean up the DOM, and trigger lifecycle hooks
      render(null, itemElContent);
    }
  });

  grid.on("change", function (e: any, items: any) {
    items = items || [];
    //console.log("gs changed event: ", e, items);
  });
});

onUnmounted(() => {});

// 2.x method - just saving list of widgets with content (default)
const load = (serializedData: any) => {
  if (!serializedData) return grid;
  grid.removeAll();
  grid.load(serializedData);
  return grid;
};

// 2.x method
const save = () => {
  let serializedData = grid.save();
  serializedData.map((item: any) => (item["content"] = ""));
  return serializedData;
};

const clear = () => {
  grid.removeAll();
};

const removeWidget = (el: any) => {
  el.remove();
  grid.removeWidget(el, false);
};

const destroyGrid = (gridId: string) => {
  if (grid && gridId == props.id) {
    try {
      grid.destroy(true);
      grid = null;
    } catch (err) {
      console.log(err);
    }
  }
};

const float = (value: boolean) => {
  (grid as any).float(value);
};

const compact = (value: boolean) => {
  if (value) {
    (grid as any).compact();
  }
};

const onCompRegister = (cid: string, data: GsComponentRefs) => {
  components[cid] = data;
  console.log(`Component ${cid} registered}`)
};

const findCompFn = (fn: string, event: GsEvent): GsComponentHandlers[] => {
  let funcs = Object.keys(components)
    .map((key) => {
      const { ...fns } = components[key].handlers || {};
       return createGsComponentHandlers(fn, fns[fn], key, components[key].props.cname, components[key].props.aliasName)
    })
    .filter((c) => c.f != undefined);
    if(event.cid) funcs = funcs.filter(c=>c.cid == event.cid);
    if(event.aliasName) funcs = funcs.filter(c=>c.aliasName == event.aliasName);
    if(event.cname) funcs = funcs.filter(c=>c.cname == event.cname);
    return funcs;
};

//expose function to parent
defineExpose({
  props,
  components,
  findCompFn,
  load,
  save,
  clear,
  float,
  compact,
  destroyGrid,
});
</script>

<style>
/** stack */

.drag-to-here {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  color: rgba(0, 0, 0, 0.3);
  padding: 30px;
}

.page .grid-stack-item-content {
  text-align: center;
  /* background-color: #18bc9c;  */
  background-color: rgba(255, 255, 255, 0.95);
  border: lightgray solid 1px;
}

.page .editable .grid-stack-item-content {
  cursor: move;
}

.editable {
  background-color: rgba(240, 240, 240, 0.95);
}

.page .grid-stack-item-content {
  cursor: default;
}

.page .grid-stack-item-removing {
  opacity: 0.5;
}

/* make nested grid have slightly darker bg take almost all space (need some to tell them apart) so items inside can have similar to external size+margin */
.grid-stack > .grid-stack-item.grid-stack-sub-grid > .grid-stack-item-content {
  background: rgba(0, 0, 0, 0.1);
  inset: 0 2px;
}

.grid-stack.grid-stack-nested {
  background: none;
  /* background-color: red; */
  /* take entire space */
  position: absolute;
  inset: 0;
  /* TODO change top: if you have content in nested grid */
}
</style>
