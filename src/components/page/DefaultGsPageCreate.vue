<template>
  <Suspense>
    <!-- <GridConfigLoader :config-file="`../dynamic/stack.config`"> -->
    <GridLayoutProvider :config="config">
      <GridStackCreate></GridStackCreate>
    </GridLayoutProvider>
    <!-- </GridConfigLoader> -->
  </Suspense>
</template>

<script setup lang="ts">
import {
  GridConfigLoader,
  GridLayoutProvider,
} from "@/components/layout/GridLayoutConfig";
import GridStackCreate from "@/components/layout/GridStackCreate.vue";
import config from "@/components/dynamic/stack.config";
</script>

<style scoped></style>
