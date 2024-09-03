<template>
  <div class="flex justify-between align-items-center bg-blue-600 text-white">
    <div class="ml-4 flex-1">
      <h1 class="text-lg font-bold">{{ gsPageParams.title }}</h1>
    </div>
    <div class="flex justify-between align-items-center">
      <button v-if="editable" @click.prevent="onEdit(gsPageParams.id)"><span class="p-3"><icon-edit size="25"/></span></button>
    </div>
  </div>

  <div class="pagemain">
    <div v-if="noPage">Page Not Found 404 </div>
    <grid-stack-layout ref="gridRef" :gsPageParams="gsPageParams"></grid-stack-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import GridStackLayout from "@/components/layout/GridStackLayout.vue";
import { createPageProps, usePageLayoutStore } from "@/store/pagelayout";

const gridRef = ref(null);

const editable = ref(true);

const noPage = ref(false);

//route info
const route = useRoute();

//change URL
const router = useRouter();

//page parameters
const gsPageParams = ref(createPageProps());

const { getPageById } = usePageLayoutStore();

onMounted(async () => {
  if (route.params.id) {
    const pageData = await getPageById((route.params as any).id);
    if (pageData) {
      gsPageParams.value = pageData;
      await load();
    } else {
      noPage.value = true;
    }
  } else {
    noPage.value = true;
  }
})

const load = async () => {
  //var data = localStorage.getItem(gsPageParams.value["id"]);
  const loadFun: Function = (gridRef.value as any).load;
  let data = await getPageById(gsPageParams.value["id"]);
  if (data) {
    gsPageParams.value = data;
    loadFun(gsPageParams.value["gsComponents"]);
  } else {
    return [
      loadFun({ id: 1, x: 2, y: 1, h: 2 }),
    ];
  }
}

const onEdit = async(pageId: string) => {
    await router.push({name: "createpage", params: {id: pageId}})
}

</script>

<style>
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

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
.pagemain {
  transition: margin-left .5s;
  padding: 20px;
}

.page .grid-stack-item-content {
    cursor: default;
}

</style>