<template>
  <div class="flex justify-between align-items-center bg-blue-600 text-white">
    <div class="ml-4 flex-1">
      <h1 class="text-lg font-bold">{{ pageProps.title }}</h1>
    </div>
    <div class="flex justify-between align-items-center">
      <!-- right -->
      <a-space class="mx-3 text-2xl font-bold">
        <a-tooltip content="just for test">
          <button @click.prevent="test()">
            <span><i class="fa-solid fa-fire"></i></span>
          </button>
        </a-tooltip>
      </a-space>

      <a-space class="mx-3 text-2xl font-bold">
        <a-tooltip content="Show page info">
          <button @click.prevent="showInfo">
            <span><i class="fa-solid fa-circle-info"></i></span>
          </button>
        </a-tooltip>
        <page-info-dialog
          :show="showInfoDialog"
          :items="pageDebugInfo"
        ></page-info-dialog>
      </a-space>

      <a-space class="mx-3 text-2xl font-bold">
        <a-tooltip content="Page preview">
          <button
            v-if="pageStatic && !isPreview && userWritable"
            @click.prevent="onEdit(pageProps.id)"
          >
            <span class="p-3"><icon-edit size="25" /></span>
          </button>
        </a-tooltip>
      </a-space>

      <a-space class="mx-3 text-2xl font-bold">
        <a-tooltip content="Go back to page design">
          <button
            v-if="pageStatic && isPreview"
            @click.prevent="onHistory(-1)"
            class="text-stone-200 font-bold py-2 px-4 rounded hover:text-white"
          >
            <!-- <span class="p-3"><icon-arrow-left size="25" /></span> -->
            <i class="fa fa-arrow-circle-left text-2xl" aria-hidden="true"></i>
          </button>
        </a-tooltip>
      </a-space>
    </div>
  </div>

  <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
  <div class="page-show">
    <div v-for="(id, index) in gridStacks">
      <suspense>
        <stack-layout
          :id="id"
          :ref="setGridStackRef(index)"
          :pageProps="pageProps"
          :pageStatic="pageStatic"
        ></stack-layout>
      </suspense>
    </div>
    <div class="flex flex-col justify-end align-items-center mb-5">
      <div>
        <!-- bottom  -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, reactive, provide, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import StackLayout from "./StackLayout.vue";
import {
  createPageProps,
  GridOptions,
  PageProps,
  StackComponentHandlers,
  StackEvent,
} from "./StackEvent";
import { useDefaultLayoutStore } from "./DefaultLayoutStore";
import { useDefaultHandler } from "./DefaultHandler";
import { Base64 } from "js-base64";
import PageInfoDialog from "./PageInfoDialog.vue";
import { Notification } from "@arco-design/web-vue";
import {
  eventSymbol,
  StackLayoutOptions,
} from "@/components/layout/StackLayoutConfig";
import { useDynamicLoader } from "./StackDynamicLoader";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

//grid id
const gridStacks = ref<string[]>([]);

// 使用 reactive 或 ref 来跟踪组件引用（但这里我们实际上使用 DOM 的 ref 属性）
const gridStackRefs = ref<any[]>([]); // 注意：这里的类型应该根据你的组件类型来定义

//page parameters
const pageProps = ref<PageProps>(createPageProps());

//static (editable or show)
const pageStatic = ref(true);

//route params
const route = useRoute();

//router
const router = useRouter();

// 定义一个方法来设置每个 grid-stack-multi-layout 的 ref
const setGridStackRef = (index: number) => {
  return (el: any) => {
    if (el) {
      if (!gridStackRefs.value[index]) {
        gridStackRefs.value[index] = el;
      }
    }
  };
};

const config: any = inject(eventSymbol.gsPageConfigOptions, false);
//console.log("inject config in page: ", config);

let dynaHs: any = false;
if (config) {
  const { imports } = useDynamicLoader();
  try {
    dynaHs = await imports(config);
  } catch {}
}

//page store
const { getPageById } = dynaHs
  ? (dynaHs as StackLayoutOptions).layoutStore()
  : useDefaultLayoutStore();

//component handler for event interact
const pageHandlers = dynaHs
  ? (dynaHs as StackLayoutOptions).eventHandler()
  : useDefaultHandler();

//Component list can be selected in page
const componentList = config ? config.resources.components : [];

// invoke function call of component
const invoke = async (
  fn: string,
  event: StackEvent,
  callback?: Function
): Promise<any[]> => await invokeInternal(fn, event, callback);

pageHandlers.fns.invoke = invoke;
//const eventHandlers = reactive({ ...pageHandlers });
provide("__page_handlers", { pageHandlers, componentList });

const isPreview = ref(false);

const userWritable = ref(true);

//show dialog which include grid info for debug
const showInfoDialog = ref(false);

//debug info
const pageDebugInfo = ref([]);

onMounted(async () => {
  if (route.params.id && route.fullPath.match(/\/page\/r/)) {
    await loadStore((route.params as any).id);
  } else if (route.params.id && route.fullPath.match(/\/page\/p/)) {
    await loadPreview((route.params as any).id);
  } else if (props.id) {
    await loadStore(props.id);
  } else {
    Notification.warning("No page id specified!");
  }
});

const loadPreview = async (id: string) => {
  //show preview
  let data = localStorage.getItem(id);
  if (data) {
    pageProps.value = JSON.parse(Base64.decode(data));
    const grids = pageProps.value.grids;
    gridStacks.value = grids.map((g: any) => g.id);
    nextTick(async () => {
      await load(grids);
    });
    isPreview.value = true;
  } else {
    Notification.warning("No page id or page data found: " + id);
  }
};

const loadStore = async (id: string) => {
  //show page
  const data = await getPageById(id);
  if (data) {
    pageProps.value = data;
    gridStacks.value = pageProps.value.grids.map((g) => g.id);
    nextTick(async () => {
      await load(pageProps.value.grids);
    });
  } else {
    Notification.warning("No page id found: " + id);
  }
};

const load = async (_grids: Array<GridOptions>) => {
  // for each grid-stack-multi-layout
  gridStackRefs.value.forEach((gridStack, index) => {
    if (gridStack) {
      const grid = _grids[index];
      gridStack.load(grid.items);
    } else {
      gridStack.load({ id: 1, x: 2, y: 1, h: 2 });
    }
  });
};

const onEdit = async (pageId: string) => {
  await router.push({ name: "createpage", params: { id: pageId } });
};

const onHistory = (n: number) => {
  //router.go(n);
  router.push({ name: "createpageback", params: { id: pageProps.value.id } });
};

/**
 * Current layout info in memory
 */
const currentPageProps = () => {
  const grids = Array<GridOptions>();
  gridStackRefs.value.forEach((gridStack, index) => {
    if (gridStack) {
      grids.push({
        id: gridStacks.value[index] as string,
        items: gridStack.save(),
      });
    }
  });
  const page = JSON.parse(JSON.stringify(pageProps.value));
  page.grids = grids;
  return page;
};

const showInfo = () => {
  pageDebugInfo.value = currentPageProps();
  showInfoDialog.value = true;
};

const findFn = (fn: string, event: StackEvent): StackComponentHandlers[] => {
  return gridStackRefs.value
    .map((g) => g.findCompFn(fn, event))
    .flatMap((c) => c);
};

const invokeInternal = async (
  fn: string,
  event: StackEvent,
  callback?: Function
) => {
  const allFuncs = findFn(fn, event).map((c: StackComponentHandlers) => {
    let resultOrPromise = c.f(event, callback);
    if (resultOrPromise instanceof Promise) {
      return resultOrPromise;
    } else {
      return Promise.resolve(resultOrPromise);
    }
  });
  return await Promise.all(allFuncs).then((result) => Promise.resolve(result));
};

const test = async () => {
  const result = await invoke("test2", {
    srcId: "",
    targetId: "",
    data: "test data in create! ",
  });
  result.forEach((r) => alert(r));
};

defineExpose({});
</script>

<style scoped>
.openbtn {
  font-size: 1.5rem;
  margin-left: 15px;
}

.fa-arrow-circle-right:hover {
  color: white;
}

.pagetitle {
  font-size: 1.5rem;
  margin-left: 20px;
}

.page-show {
  transition: margin-left 0.5s;
  padding: 20px;
}

.page .grid-stack-item-content {
  cursor: default;
}
</style>
