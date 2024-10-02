<template>
  <Suspense>
    <GridLayoutProvider :config="config">
      <GridStackPage :id="pageId"></GridStackPage>
    </GridLayoutProvider>
  </Suspense>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  GridConfigLoader,
  GridLayoutProvider,
} from "@/components/layout/GridLayoutConfig";
import config from "@/components/dynamic/stack.config";
import GridStackPage from "@/components/layout/GridStackPage.vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const pageId = ref("");

const route = useRoute();

onMounted(() => {
  if (route.params.id) {
    pageId.value = (route.params as any).id;
  } else if (props.id) {
    pageId.value = props.id;
  }
});
</script>

<style scoped></style>
