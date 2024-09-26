<template>  
    <div class="page-list">
     <simple-list-parts></simple-list-parts>
  </div>
</template>

<script setup lang="ts">
import SimpleListParts from "@/components/layout/SimpleListParts.vue";

</script>

<style scoped>

.page-list {
  transition: margin-left .5s;
  padding: 20px;
}

</style>