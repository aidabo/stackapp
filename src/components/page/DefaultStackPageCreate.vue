<template>
  <Suspense>
    <!-- <GridConfigLoader :config-file="`../dynamic/stack.config`"> -->
    <StackLayoutProvider :config="config">
      <StackPageCreate></StackPageCreate>
    </StackLayoutProvider>
    <!-- </GridConfigLoader> -->
  </Suspense>
</template>

<script setup lang="ts">
import {
  StackLayoutProvider,
} from "@/components/layout/StackLayoutConfig";
import StackPageCreate from "@/components/layout/StackPageCreate.vue";
import config from "@/components/dynamic/stack.config";
</script>

<style scoped></style>
