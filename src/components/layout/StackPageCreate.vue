<template>
  <!-- navi panel -->
  <stack-navi-panel
    :pannel-width="pannelWidth"
    :publish="publish"
    :save="save"
    :load="loadStore"
    :clear="clear"
    :close="close"
  ></stack-navi-panel>

  <!-- Show create page time and menu -->
  <div class="flex justify-between align-items-center bg-blue-600 text-white">
    <div class="ml-4 flex-1">
      <h1 class="m-1">
        <button
          class="text-stone-200 font-bold py-2 px-4 rounded hover:text-white"
          @click.prevent="open"
        >
          <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </button>

        <a-space class="ml-64 text-lg font-bold">
          <span v-if="!isTitleEditable">{{ pageProps.title }}</span>
          <a-input
            v-else
            @change="onTitleChanged"
            :style="{ width: '320px' }"
            v-model="pageProps.title"
          />
          <!-- <a-button style="background-color: transparent;color: white;" @click.prevent="onTitleEditable"><icon-edit /></a-button> -->
          <icon-edit
            class="size-5 cursor-pointer"
            @click.prevent="onTitleEditable"
          />
        </a-space>

        <a-space class="mx-8 text-lg">
          <!-- Float
          <a-switch
            class="mx-3"
            v-model="gridOption.float"
            checked-color="#14C9C9"
            unchecked-color="lightgray"
          ></a-switch> -->
          Compact
          <a-switch
            class="mx-3"
            v-model="gridOption.compact"
            checked-color="#14C9C9"
            unchecked-color="lightgray"
          ></a-switch>
        </a-space>

        <a-space
          class="mx-3 text-2xl font-bold"
          v-if="!pageStatic"
          @click.prevent="addGrid()"
        >
          <a-tooltip content="Add a grid into layout">
            <a-button type="outline">
              <template #icon>
                <i
                  class="fa fa-solid fa-plus text-white size-6 justify-center mt-2"
                ></i>
              </template>
              <!-- Use the default slot to avoid extra spaces -->
              <template #default
                ><span class="text-white">Increase Grid</span></template
              >
            </a-button>
          </a-tooltip>
        </a-space>
      </h1>
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
        <a-tooltip content="Page Preview">
          <button v-if="!pageStatic" @click.prevent="preview()">
            <span><i class="fa-solid fa-eye"></i></span>
          </button>
        </a-tooltip>
      </a-space>

      <a-space class="mx-3 text-2xl font-bold" v-if="!pageStatic">
        <a-tooltip content="Exit page design">
          <a-popconfirm
            content="Are you sure you want to exit "
            type="info"
            @ok="closeDesign"
          >
            <a-button type="outline" status="warning" style="font-weight: 600">
              <template #icon>
                <icon-close size="18" />
              </template>
              <!-- Use the default slot to avoid extra spaces -->
              <template #default>Exit Design</template>
            </a-button>
          </a-popconfirm>
        </a-tooltip>
      </a-space>
    </div>
  </div>

  <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
  <div class="page-create" :style="{ marginLeft: pannelWidth + 'px' }">
    <div v-for="(id, index) in gridStacks">
      <suspense>
        <stack-layout
          :id="id"
          :ref="setGridStackRef(index)"
          :pageProps="pageProps"
          :pageStatic="pageStatic"
          :key="id"
        >
          <template #menu>
            <stack-menu
              :grid-id="id"
              :last-grid="
                index == gridStacks.length - 1 && gridStacks.length > 1
              "
              v-if="!pageStatic"
              @grid:remove="removeGrid"
            ></stack-menu>
          </template>
        </stack-layout>
        <template #fallback>
          <div>Loading...</div>
        </template>
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
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  provide,
  reactive,
  inject,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import StackLayout from "@/components/layout/StackLayout.vue";
import StackMenu from "@/components/layout/StackMenu.vue";
import StackNaviPanel from "@/components/layout/StackNaviPanel.vue";
import {
  createNewGrid,
  createPageProps,
  GridOptions,
  StackComponentHandlers,
  StackEvent,
  PageProps,
} from "@/components/layout/StackEvent";
import PageInfoDialog from "@/components/dialog/PageInfoDialog.vue";
import { Base64 } from "js-base64";
import { Notification } from "@arco-design/web-vue";
import { useDefaultLayoutStore } from "@/store/DefaultLayoutStore";
import { useDefaultHandler } from "@/handlers/DefaultHandler"
import {
  eventSymbol,
  StackLayoutOptions,
} from "@/components/layout/StackLayoutConfig";
import { useDynamicLoader } from "@/components/layout/StackDynamicLoader";

//grid id
const gridStacks = ref<string[]>([]);

// 使用 reactive 或 ref 来跟踪组件引用（但这里我们实际上使用 DOM 的 ref 属性）
const gridStackRefs = ref<any[]>([]); // 注意：这里的类型应该根据你的组件类型来定义

//page parameters
const pageProps = ref<PageProps>(createPageProps());

//static (editable or show)
const pageStatic = ref(false);

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

// const imports = async () => {
//   let dynaHandlers: any = false;
//   if (config) {
//     const { importConfiged } = useDynamicLoader();
//     try {
//       dynaHandlers = (await importConfiged(config)) as any;
//     } catch {}
//   }
// };
let dynaHs: any = false;
if(config){
  const { imports } = useDynamicLoader();
  try{
    dynaHs = await imports(config);
  }catch{}
}

//page store
const { savePage, getPageById } = dynaHs
  ? (dynaHs as StackLayoutOptions).layoutStore()
  : useDefaultLayoutStore();

//component handler for event interact
const pageHandlers = dynaHs
  ? (dynaHs as StackLayoutOptions).eventHandler()
  : useDefaultHandler();

const invoke = async (
  fn: string,
  event: StackEvent,
  callback?: Function
): Promise<any[]> => await invokeInternal(fn, event, callback);

pageHandlers.fns.invoke = invoke;
const eventHandlers = reactive({ ...pageHandlers });
provide("__page_handlers", eventHandlers);

//title edit status
const isTitleEditable = ref(false);

//title edit status toggle
const onTitleEditable = () => {
  isTitleEditable.value = !isTitleEditable.value;
};

//if title edit started or end
const onTitleChanged = () => {
  isTitleEditable.value = !isTitleEditable.value;
};

const pannelWidth = ref(300);

const open = () => {
  pannelWidth.value = 300;
};

const close = () => {
  pannelWidth.value = 0;
};

//compact or float grid
const gridOption = ref({
  float: false,
  compact: false,
});

//show dialog which include grid info for debug
const showInfoDialog = ref(false);

//debug info
const pageDebugInfo = ref([]);

onMounted(async () => {
  if (route.params.id && route.fullPath.match(/\/page\/w/)) {
    await loadStore();
  } else if (route.params.id && route.fullPath.match(/\/page\/b\/w/)) {
    await loadLocal();
  } else {
    const grids = pageProps.value.grids || [];
    gridStacks.value = grids.map((g) => g.id);
    if (gridStacks.value.length == 0) {
      addGrid();
    }
  }
});

onUnmounted(() => {
  //gridStackRefs.value.splice(0, gridStackRefs.value.length);
  //console.log("unmount called when move from create...");
});

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

const loadLocal = async () => {
  //show preview
  let data = localStorage.getItem((route.params as any).id);
  if (data) {
    pageProps.value = JSON.parse(Base64.decode(data));
    const grids = pageProps.value.grids;
    gridStacks.value = grids.map((g: any) => g.id);
    //waiting grid-stack vnode created
    nextTick(async () => {
      await load(grids);
    });
  }
};

const loadStore = async () => {
  let pageId = (route.params as any).id;
  if (!pageId) {
    pageId = pageProps.value.id;
  }
  pageProps.value = await getPageById(pageId);
  gridStacks.value = pageProps.value.grids.map((g) => g.id);
  //waiting grid-stack vnode created
  nextTick(async () => {
    await load(pageProps.value.grids);
  });
};

const save = async (isPublish = false) => {
  const grids = Array<GridOptions>();
  gridStackRefs.value.forEach((gridStack, index) => {
    if (gridStack) {
      // 现在你可以使用 gridStack 来访问对应的组件实例或 DOM 元素了
      grids.push({ id: gridStacks.value[index], items: gridStack.save() });
    }
  });
  pageProps.value.grids = grids;
  await savePage(pageProps.value);

  if (!isPublish) {
    Notification.success("Saved successfully!");
  }
};

const clear = async () => {
  gridStackRefs.value.forEach((gridStack, index) => {
    if (gridStack) {
      gridStack.clear();
    }
  });
};

const preview = async () => {
  const id = pageProps.value["id"];
  let data = Base64.encode(JSON.stringify(currentPageProps()));
  localStorage.setItem(id, data);
  router.push({ name: "preview", params: { id: id } });
};

const publish = async () => {
  pageProps.value.status = "published";
  await save(true);

  Notification.success("Published successfully!");

  setTimeout(() => {
    const id = pageProps.value["id"];
    router.push({ name: "page", params: { id: id } });
  }, 1000);
};

const closeDesign = () => {
  router.push({ name: "pagelist" });
};

watch(
  gridOption.value,
  () => {
    gridStackRefs.value.forEach((gridStack, index) => {
      if (gridStack) {
        gridStack.float(gridOption.value.float);
        if (gridOption.value.compact) {
          gridStack.compact(gridOption.value.compact);
        }
      }
    });
  },
  { deep: true }
);

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

const addGrid = () => {
  const grid = createNewGrid();
  gridStacks.value.push(grid.id);
  nextTick(() => {
    //console.log("grid increase", gridStackRefs.value.length)
  });
};

const removeGrid = async (gridId: string) => {
  if (gridStacks.value.length == 1) {
    Notification.error("Only one grid in the layout, ignore delete!");
  } else if (gridStacks.value.find((i) => i == gridId)) {
    try {
      //destroy grid stack DOM
      const index = gridStacks.value.findIndex((i) => i == gridId);
      //only last grid can be deleted
      if (index == gridStacks.value.length - 1) {
        const grid = gridStackRefs.value[index];
        grid.clear();
        grid.destroyGrid(gridId);
        //remove grid from ref
        gridStacks.value.splice(index, 1);
        //wait update
        nextTick(async () => {
          //remain only active grid refs
          const allRefs = gridStackRefs.value.splice(
            0,
            gridStackRefs.value.length
          );
          gridStacks.value.forEach((id) => {
            const mygrid = allRefs.find((g) => g.props.id == id);
            gridStackRefs.value.push(mygrid);
          });
        });
      }
    } catch (err) {
      Notification.error("Grid deleted from layout error: " + gridId);
    }
  }
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
    //targetId:"comp_e1f4a7be-dd72-471d-b83e-bcad15db3afb",
    data: "test data in create! ",
  });
  result.forEach((r: any) => alert(r));
};

defineExpose({
  showInfo,
  load,
  save,
  clear,
  preview,
  publish,
  invoke,
});
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
  margin-left: 300px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
.page-create {
  transition: margin-left 0.5s;
  padding: 0.75rem;
}

.grid-stack-item-removing {
  opacity: 0.8;
  filter: blur(5px);
}

</style>
