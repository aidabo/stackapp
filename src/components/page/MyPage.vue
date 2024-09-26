<template>
  <div class="flex justify-between align-items-center bg-blue-600 text-white">
    <div class="ml-4 flex-1">
      <h1 class="text-lg font-bold">{{ pageProps.title }}</h1>
    </div>
    <div class="flex justify-between align-items-center">
      <button
        v-if="pageStatic && !isPreview && userWritable"
        @click.prevent="onEdit(pageProps.id)"
      >
        <span class="p-3"><icon-edit size="25" /></span>
      </button>
      <button
        v-if="pageStatic && isPreview"
        @click.prevent="onHistory(-1)"
        class="text-stone-200 font-bold py-2 px-4 rounded hover:text-white"
      >
        <!-- <span class="p-3"><icon-arrow-left size="25" /></span> -->
        <i class="fa fa-arrow-circle-left text-2xl" aria-hidden="true"></i>
      </button>
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
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import GridStackLayout from "@/components/layout/GridStackLayout.vue";
import {
  createPageProps,
  GridOptions,
  PageProps,
} from "@/components/layout/GridEvent";
import { useDefaultLayoutStore } from "@/components/dynamic/store/DefaultLayoutStore";
import { Base64 } from "js-base64";

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

const { getPageById } = useDefaultLayoutStore();

const noPage = ref(false);

const isPreview = ref(false);

const userWritable = ref(true);

onMounted(async () => {
  if (route.params.id && route.fullPath.match(/\/page\/r/)) {
    //show page
    pageProps.value = await getPageById((route.params as any).id);
    gridStacks.value = pageProps.value.grids.map((g) => g.id);
    nextTick(async () => {
      await load(pageProps.value.grids);
    });
    noPage.value = false;
  } else if (route.params.id && route.fullPath.match(/\/page\/p/)) {
    //show preview
    let data = localStorage.getItem((route.params as any).id);
    if (data) {
      let grids = JSON.parse(Base64.decode(data));
      gridStacks.value = grids.map((g: any) => g.id);
      nextTick(async () => {
        await load(grids);
      });
      isPreview.value = true;
    }
    noPage.value = false;
  } else {
    noPage.value = true;
  }
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

const onEdit = async (pageId: string) => {
  await router.push({ name: "createpage", params: { id: pageId } });
};

const onHistory = (n: number) => {
  router.go(n);
};
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
