<template>
    <Suspense>
      <GridConfigLoader :config-file="`../dynamic/stack.config`">
        <GridStackPage :id="pageId" ></GridStackPage>
      </GridConfigLoader>
    </Suspense>
  </template>
  
  <script setup lang="ts">
  import { GridConfigLoader } from "@/components/layout/GridLayoutConfig";
  import GridStackPage from "@/components/layout/GridStackPage.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

  const props = defineProps({
    id: {
      type: String,
      default: "",
    },
  });

  const pageId  = ref("")

  const route = useRoute();

  onMounted(()=>{
    if(route.params.id){
        pageId.value = (route.params as any).id;
    }else if(props.id){
        pageId.value = props.id
    }
  })
  
  </script>
  
  <style scoped>
  </style>
  

