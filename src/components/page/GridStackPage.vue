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
        <grid-stack-layout
          :id="id"
          :ref="setGridStackRef(index)"
          :pageProps="pageProps"
          :pageStatic="pageStatic"
        ></grid-stack-layout>
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
import { ref, onMounted, nextTick, reactive, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import GridStackLayout from "@/components/layout/GridStackLayout.vue";
import {
  createPageProps,
  GridOptions,
  PageProps,
  GsComponentHandlers
} from "@/components/layout/GridEvent";
import { usePageLayoutStore } from "@/store/PageLayoutStore";
import { Base64 } from "js-base64";
import { useComponentHandlers } from "@/components/layout/useComponentHandlers";
import PageInfoDialog from "@/components/dialog/PageInfoDialog.vue";


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

// invoke function call of component
const invoke = async (fn: string, cid?: string, data?: any): Promise<any[]> => await invokeInternal(fn, cid, data);
const invokeByName = async (fn: string, compName?: string, data?: any): Promise<any[]> => await invokeByNameInternal(fn, compName, data);

//process handler of component 
const { loadHandler, saveHandler, itemChangedHandler  } = useComponentHandlers(pageProps.value, invoke, invokeByName);
const eventHandlers = reactive({
  loadHandler,
  saveHandler,
  itemChangedHandler,
});

provide("__page_handlers", eventHandlers);

const { getPageById } = usePageLayoutStore();

const noPage = ref(false);

const isPreview = ref(false);

const userWritable = ref(true);

//show dialog which include grid info for debug
const showInfoDialog = ref(false);

//debug info
const pageDebugInfo = ref([]);

onMounted(async () => {
  if (route.params.id && route.fullPath.match(/\/page\/r/)) {
    loadStore();
  } else if (route.params.id && route.fullPath.match(/\/page\/p/)) {
    loadPreview();
  } else {
    noPage.value = true;
  }
});

const loadPreview = async() =>{
    //show preview
    let data = localStorage.getItem((route.params as any).id);
    if (data) {
      pageProps.value = JSON.parse(Base64.decode(data));      
      const grids = pageProps.value.grids;
      gridStacks.value = grids.map((g: any) => g.id);
      nextTick(async () => {
        await load(grids);
      });
      isPreview.value = true;
    }
    noPage.value = false;
}

const loadStore = async() =>{
    //show page
    pageProps.value = await getPageById((route.params as any).id);
    gridStacks.value = pageProps.value.grids.map((g) => g.id);
    nextTick(async () => {
      await load(pageProps.value.grids);
    });
    noPage.value = false;
}

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

const showInfo = () => {
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
  pageDebugInfo.value = page;
  showInfoDialog.value = true;
};


const findFn = (fn: string, cid?: string): GsComponentHandlers[] => {
  return gridStackRefs.value
    .map((g) => g.findCompFn(fn, cid))
    .flatMap((c) => c);
};

const findFnByName = (fn: string, compName?: string): GsComponentHandlers[] => {
  return gridStackRefs.value
    .map((g) => g.findCompFnByName(fn, compName))
    .flatMap((c) => c);
};

const invokeInternal = async (fn: string, cid?: string, data?: any) => {
    const allFuncs = findFn(fn, cid).map((c: GsComponentHandlers) => {
      let resultOrPromise = c.f(c.cid, data);
      if (resultOrPromise instanceof Promise) {
        return resultOrPromise;
      } else {
        return Promise.resolve(resultOrPromise);
      }
    });
    return await Promise.all(allFuncs).then(result=>Promise.resolve(result));
  };

const invokeByNameInternal = async (fn: string, compName?: string, data?: any) => {
    const allFuncs = findFnByName(fn, compName).map((c: GsComponentHandlers) => {
      let resultOrPromise = c.f(c.cid, data);
      if (resultOrPromise instanceof Promise) {
        return resultOrPromise;
      } else {
        return Promise.resolve(resultOrPromise);
      }
    });
    return await Promise.all(allFuncs).then(result=>Promise.resolve(result));
};


const test = async () => {
  const result = await invoke("test1", undefined, "test data in create! ")
  result.forEach(r=>alert(r));
};

defineExpose ({

})

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
