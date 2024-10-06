<template>
  <Suspense>
    <!-- <GridConfigLoader :config-file="`../dynamic/stack.config`"> -->
    <StackLayoutProvider :config="config">
      <GridStackCreate></GridStackCreate>
    </StackLayoutProvider>
    <!-- </GridConfigLoader> -->
  </Suspense>
</template>

<script setup lang="ts">
import {
  StackLayoutProvider,
} from "@/components/layout/StackLayoutConfig";
import GridStackCreate from "@/components/layout/StackPageCreate.vue";
import config from "@/components/dynamic/stack.config";
</script>

<style scoped></style>
