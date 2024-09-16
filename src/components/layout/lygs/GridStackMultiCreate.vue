<template>
  <div id="pageSidenav" class="sidenav" :style="{ width: pannelWidth + 'px' }">
    <!-- panel button action -->
    <div class="flex">
      <div class="flex-none">
        <a href="#" class="mybtn" @click.prevent="publish()"
          ><i class="fa fa-solid fa-square-share-nodes"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="save()"
          ><i class="fa fa-solid fa-save"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="load()"
          ><i class="fa fa-solid fa-refresh"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="clear()"
          ><i class="fa fa-solid fa-eraser"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="close()"
          ><i class="fa fa-solid fa-arrow-left"></i
        ></a>
      </div>
    </div>

    <div>
      <!-- remove component panel-->
      <div
        id="trash"
        style="padding: 5px; margin-bottom: 10px"
        class="text-center text-white bg-amber-400"
      >
        <div>
          <i class="fa fa-solid fa-trash" style="font-size: 250%"></i>
        </div>
        <div class="py-5">
          <span>Drop here to remove!</span>
        </div>
      </div>

      <!-- list of components to be selected  -->
      <div
        v-for="item in gsComponentData"
        class="newWidget grid-stack-item grid-custom"
      >
        <div
          class="grid-stack-item-content drag"
          :gscomponent="gsGetComponentInfo(item.name)"
        >
          <div>
            <i class="fa fa-solid fa-plus" style="font-size: 200%"></i>
          </div>
          <div class="h-10">
            <span class="size-8 my-4">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Show components panel and page title -->
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
            <a-button type="outline" status="warning">
              <template #icon>
                <icon-close />
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
        <grid-stack-multi-layout
          :id="id"
          :ref="setGridStackRef(index)"
          :pageProps="pageProps"
          :pageStatic="pageStatic"
          :key="id"
        >
          <template #menu>
            <grid-menu
              :gridId="id"
              v-if="!pageStatic"
              @grid:remove="removeGrid"
            ></grid-menu>
          </template>
        </grid-stack-multi-layout>
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
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import GridStackMultiLayout from "@/components/layout/lygs/GridStackMultiLayout.vue";
import {
  createNewGrid,
  createPageProps,
  GridOptions,
  PageProps,
} from "@/components/layout/lygs/GridEvent";
import { usePageLayoutStore } from "@/store/pagelayout";
import { usePageComponents } from "@/components/layout/shared/usePageComponents";
import PageInfoDialog from "@/components/dialog/PageInfoDialog.vue";
import { Base64 } from "js-base64";
import { Notification } from "@arco-design/web-vue";
import GridMenu from "@/components/layout/lygs/GridMenu.vue";

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

//compact or float grid
const gridOption = ref({
  float: false,
  compact: false,
});

//show dialog which include grid info for debug
const showInfoDialog = ref(false);

//debug info
const pageDebugInfo = ref();

//persistence save page component & grid layout info
const { savePage, getPageById } = usePageLayoutStore();

const { gsComponentData, gsGetComponentInfo } = usePageComponents();

const pannelWidth = ref(250);

onMounted(async () => {
  if (route.params.id) {
    pageProps.value = await getPageById((route.params as any).id);
    const grids = pageProps.value.grids || pageProps.value.gsComponents || [];
    gridStacks.value = grids.map((g) => g.id);
    nextTick(async () => {
      await load();
    });
  } else {
    const grids = pageProps.value.grids || pageProps.value.gsComponents || [];
    gridStacks.value = grids.map((g) => g.id);
  }
});

onUnmounted(() => {
  //gridStackRefs.value.splice(0, gridStackRefs.value.length);
  console.log("unmount called...");
});

const open = () => {
  pannelWidth.value = 250;
};

const close = () => {
  pannelWidth.value = 0;
};

const load = async () => {
  pageProps.value = (await getPageById(pageProps.value["id"])) as any;
  // for each grid-stack-multi-layout
  gridStackRefs.value.forEach((gridStack, index) => {
    if (gridStack) {
      const grid = (
        pageProps.value.grids ||
        pageProps.value.gsComponents ||
        []
      ).find((g) => g.id == gridStacks.value[index]);
      if (grid) {
        gridStack.load(grid.items);
      } else {
        gridStack.load({ id: 1, x: 2, y: 1, h: 2 });
      }
    }
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
    Notification.success({
      id: "page_create_save",
      title: "Success",
      content: "Saved successfully!",
    });
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
  const grids = Array<GridOptions>();
  gridStackRefs.value.forEach((gridStack, index) => {
    if (gridStack) {
      grids.push({
        id: gridStacks.value[index] as string,
        items: gridStack.save(),
      });
    }
  });
  grids;
  let data = Base64.encode(JSON.stringify(grids));
  localStorage.setItem(id, data);
  router.push({ name: "preview", params: { id: id } });
};

const publish = async () => {
  pageProps.value.status = "published";
  await save(true);

  Notification.success({
    id: "page_create_publish",
    title: "Success",
    content: "Published successfully!",
  });

  setTimeout(() => {
    const id = pageProps.value["id"];
    router.push({ name: "page", params: { id: id } });
  }, 1500);
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

const addGrid = () => {
  const grid = createNewGrid();
  gridStacks.value.push(grid.id);
  nextTick(() => {
    //console.log("grid increase", gridStackRefs.value.length)
  });
};

const removeGrid = async (gridId: string) => {
  if (gridStacks.value.length == 1) {
    Notification.error({
      id: "delete_grid",
      title: "Error",
      content: "Only one grid in the layout, ignore delete!",
    });
  } else if (gridStacks.value.find((i) => i == gridId)) {
    try {
      //destroy grid stack DOM
      const index = gridStacks.value.findIndex((i) => i == gridId);
      const grid = gridStackRefs.value[index];
      grid.destroyGrid(gridId);
      //remove grid from ref
      gridStacks.value.splice(index, 1);
      //wait update
      nextTick(async () => {
        //remain only active grid refs 
        const allRefs = gridStackRefs.value.splice(0, gridStackRefs.value.length);
        gridStacks.value.forEach((id) => {
          const mygrid = allRefs.find((g) => g.props.id == id);
          gridStackRefs.value.push(mygrid);
        });
      });
    } catch (err) {
      Notification.error({
        id: "delete_grid",
        title: "Error",
        content: "Grid deleted from layout error: " + gridId,
      });
    }
    //nextTick(() => {
    // Notification.success({
    //   id: "delete_grid",
    //   title: "Success",
    //   content: "Grid deleted from layout: " + gridId,
    // });
    //});
  }
};
</script>

<style scoped>
/* The side navigation menu */
.sidenav {
  height: 100%;
  /* 100% Full-height */
  width: 0;
  /* 0 width - change this with JavaScript */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Stay on top */
  /* top: 50px; */
  /* Stay at the top */
  left: 0;
  background-color: black;
  /* Black*/
  overflow-x: hidden;
  overflow-y: auto;
  /* Disable horizontal scroll */
  /* padding-top: 80px; */
  /* Place content 60px from the top */
  transition: 0.5s;
  /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 16px;
  text-decoration: none;
  font-size: 25px;
  color: rgb(29, 31, 31, 0.1);
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 1.5rem;
  margin-left: 50px;
  color: #b1b1b1;
}

/* Position and style the close button (top right corner) */
.sidenav .mybtn {
  /* position: absolute; */
  top: 0;
  font-size: 1.5rem;
  /* margin-left: 15px; */
  color: #b1b1b1;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

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

.trash {
  height: 120px;
  background: rgba(255, 0, 0, 0.1) center center
    url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDQzOC41MjkgNDM4LjUyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjUyOSA0MzguNTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQxNy42ODksNzUuNjU0Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2OC02LjU2My0yLjU2OGgtODguMjI0TDMwMi45MTcsMjUuNDFjLTIuODU0LTcuMDQ0LTcuOTk0LTEzLjA0LTE1LjQxMy0xNy45ODkgICAgQzI4MC4wNzgsMi40NzMsMjcyLjU1NiwwLDI2NC45NDUsMGgtOTEuMzYzYy03LjYxMSwwLTE1LjEzMSwyLjQ3My0yMi41NTQsNy40MjFjLTcuNDI0LDQuOTQ5LTEyLjU2MywxMC45NDQtMTUuNDE5LDE3Ljk4OSAgICBsLTE5Ljk4NSw0Ny42NzZoLTg4LjIyYy0yLjY2NywwLTQuODUzLDAuODU5LTYuNTY3LDIuNTY4Yy0xLjcwOSwxLjcxMy0yLjU2OCwzLjkwMy0yLjU2OCw2LjU2N3YxOC4yNzQgICAgYzAsMi42NjQsMC44NTUsNC44NTQsMi41NjgsNi41NjRjMS43MTQsMS43MTIsMy45MDQsMi41NjgsNi41NjcsMi41NjhoMjcuNDA2djI3MS44YzAsMTUuODAzLDQuNDczLDI5LjI2NiwxMy40MTgsNDAuMzk4ICAgIGM4Ljk0NywxMS4xMzksMTkuNzAxLDE2LjcwMywzMi4yNjQsMTYuNzAzaDIzNy41NDJjMTIuNTY2LDAsMjMuMzE5LTUuNzU2LDMyLjI2NS0xNy4yNjhjOC45NDUtMTEuNTIsMTMuNDE1LTI1LjE3NCwxMy40MTUtNDAuOTcxICAgIFYxMDkuNjI3aDI3LjQxMWMyLjY2MiwwLDQuODUzLTAuODU2LDYuNTYzLTIuNTY4YzEuNzA4LTEuNzA5LDIuNTctMy45LDIuNTctNi41NjRWODIuMjIxICAgIEM0MjAuMjYsNzkuNTU3LDQxOS4zOTcsNzcuMzY3LDQxNy42ODksNzUuNjU0eiBNMTY5LjMwMSwzOS42NzhjMS4zMzEtMS43MTIsMi45NS0yLjc2Miw0Ljg1My0zLjE0aDkwLjUwNCAgICBjMS45MDMsMC4zODEsMy41MjUsMS40Myw0Ljg1NCwzLjE0bDEzLjcwOSwzMy40MDRIMTU1LjMxMUwxNjkuMzAxLDM5LjY3OHogTTM0Ny4xNzMsMzgwLjI5MWMwLDQuMTg2LTAuNjY0LDguMDQyLTEuOTk5LDExLjU2MSAgICBjLTEuMzM0LDMuNTE4LTIuNzE3LDYuMDg4LTQuMTQxLDcuNzA2Yy0xLjQzMSwxLjYyMi0yLjQyMywyLjQyNy0yLjk5OCwyLjQyN0gxMDAuNDkzYy0wLjU3MSwwLTEuNTY1LTAuODA1LTIuOTk2LTIuNDI3ICAgIGMtMS40MjktMS42MTgtMi44MS00LjE4OC00LjE0My03LjcwNmMtMS4zMzEtMy41MTktMS45OTctNy4zNzktMS45OTctMTEuNTYxVjEwOS42MjdoMjU1LjgxNVYzODAuMjkxeiIgZmlsbD0iI2ZmOWNhZSIvPgoJCTxwYXRoIGQ9Ik0xMzcuMDQsMzQ3LjE3MmgxOC4yNzFjMi42NjcsMCw0Ljg1OC0wLjg1NSw2LjU2Ny0yLjU2N2MxLjcwOS0xLjcxOCwyLjU2OC0zLjkwMSwyLjU2OC02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTktNC44NTMtMi41NjgtNi41NjdjLTEuNzE0LTEuNzA5LTMuODk5LTIuNTY1LTYuNTY3LTIuNTY1SDEzNy4wNGMtMi42NjcsMC00Ljg1NCwwLjg1NS02LjU2NywyLjU2NSAgICBjLTEuNzExLDEuNzE0LTIuNTY4LDMuOTA0LTIuNTY4LDYuNTY3djE2NC40NTRjMCwyLjY2OSwwLjg1NCw0Ljg1MywyLjU2OCw2LjU3QzEzMi4xODYsMzQ2LjMxNiwxMzQuMzczLDM0Ny4xNzIsMTM3LjA0LDM0Ny4xNzJ6IiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTIxMC4xMjksMzQ3LjE3MmgxOC4yNzFjMi42NjYsMCw0Ljg1Ni0wLjg1NSw2LjU2NC0yLjU2N2MxLjcxOC0xLjcxOCwyLjU2OS0zLjkwMSwyLjU2OS02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTItNC44NTMtMi41NjktNi41NjdjLTEuNzA4LTEuNzA5LTMuODk4LTIuNTY1LTYuNTY0LTIuNTY1aC0xOC4yNzFjLTIuNjY0LDAtNC44NTQsMC44NTUtNi41NjcsMi41NjUgICAgYy0xLjcxNCwxLjcxNC0yLjU2OCwzLjkwNC0yLjU2OCw2LjU2N3YxNjQuNDU0YzAsMi42NjksMC44NTQsNC44NTMsMi41NjgsNi41N0MyMDUuMjc0LDM0Ni4zMTYsMjA3LjQ2NSwzNDcuMTcyLDIxMC4xMjksMzQ3LjE3MnogICAgIiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTI4My4yMiwzNDcuMTcyaDE4LjI2OGMyLjY2OSwwLDQuODU5LTAuODU1LDYuNTctMi41NjdjMS43MTEtMS43MTgsMi41NjItMy45MDEsMi41NjItNi41N1YxNzMuNTgxICAgIGMwLTIuNjYzLTAuODUyLTQuODUzLTIuNTYyLTYuNTY3Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2NS02LjU3LTIuNTY1SDI4My4yMmMtMi42NywwLTQuODUzLDAuODU1LTYuNTcxLDIuNTY1ICAgIGMtMS43MTEsMS43MTQtMi41NjYsMy45MDQtMi41NjYsNi41Njd2MTY0LjQ1NGMwLDIuNjY5LDAuODU1LDQuODUzLDIuNTY2LDYuNTdDMjc4LjM2NywzNDYuMzE2LDI4MC41NSwzNDcuMTcyLDI4My4yMiwzNDcuMTcyeiIgZmlsbD0iI2ZmOWNhZSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)
    no-repeat;
}

.sidebar {
  background: rgba(0, 255, 0, 0.1);
  padding: 25px 0;
  height: 100px;
  text-align: center;
}

.sidebar .grid-stack-item {
  width: 120px;
  height: 50px;
  text-align: center;
  line-height: 35px;
  background: rgba(0, 255, 0, 0.1);
  cursor: default;
  display: inline-block;
}

.sidebar .grid-stack-item .grid-stack-item-content {
  /* background: none; */
  text-align: center;
  /* background-color: #18bc9c; */
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}

.grid-stack-item-removing {
  opacity: 0.8;
  filter: blur(5px);
}

#trash {
  background: rgba(255, 0, 0, 0.4);
  padding: 15px;
}

.grid-custom {
  background-color: #18bc9c;
  text-align: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}
</style>
