<template>
  <div class="full-w p-1 page">
    <div
      ref="gsLayout"
      :id="id"
      class="grid-stack"
      :class="{ editable: pageStatic == false }"
    >
      <div v-if="!pageStatic" class="drag-to-here">Drag to here</div>
      <slot name="menu"></slot>
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
  inject,
  onUnmounted,
} from "vue";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import GridStackItem from "./GridStackItem";
import { v4 as uuidv4 } from "uuid";

const gsLayout = ref(null);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  pageProps: {
    type: Object,
    required: true,
  },
  pageStatic: {
    type: Boolean,
    required: true,
  },
});

var grid: any = null; // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115

onMounted(async () => {
  //@ts-ignore
  let el: HTMLElement =
    document.getElementById(props.id) || document.querySelector(".grid-stack");
  grid = GridStack.init(
    {
      // DO NOT user grid.value = GridStack.init(), see above
      float: true,
      cellHeight: "25",
      minRow: 5,
      acceptWidgets: true,
      removable: "#trash", // drag-out delete class
    },
    el
  );

  grid.setStatic(props.pageStatic ?? false);

  GridStack.setupDragIn(".newWidget", { appendTo: "body", helper: "clone" });

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

      const itemContentVNode: any = h(GridStackItem, { item: item });

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
    console.log("gs changed event: ", e, items);
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

const float = (value: boolean) => {
  (grid as any).float(value);
};

const compact = (value: boolean) => {
  if (value) {
    (grid as any).compact();
  }
};

const column = (value: number) => {
  if (value != grid.column) {
    grid.column(value, "list");
  }
};

watch(
  props,
  () => {
    if (props.pageStatic) {
      console.log("watch event", props.pageStatic, grid);
    }
  },
  { deep: true }
);

//expose function to parent
defineExpose({ load, save, clear, float, compact });
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

/* Responsive Grid Layout */
@media (min-width: 768px) {
  .grid-stack {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .grid-stack {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid-stack {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
