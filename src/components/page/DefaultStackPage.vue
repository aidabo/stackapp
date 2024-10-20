<template>
  <Suspense>
    <StackLayoutProvider :config="config">
      <StackPage :id="pageId"></StackPage>
    </StackLayoutProvider>
  </Suspense>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  StackLayoutProvider,
} from "@/components/layout/StackLayoutConfig";
import config from "@/components/dynamic/stack.config";
import StackPage from "@/components/layout/StackPage.vue";

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
