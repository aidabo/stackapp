<template>
  <Suspense>
    <GridConfigLoader :config-file="`../dynamic/stack.config`">
      <GridStackCreate></GridStackCreate>
    </GridConfigLoader>
  </Suspense>
</template>

<script setup lang="ts">
import { GridConfigLoader } from "@/components/layout/GridLayoutConfig";
import GridStackCreate from "@/components/layout/GridStackCreate.vue";
</script>

<style scoped>
</style>
