<template>  
    <div class="pagemain">
     <simple-list-parts></simple-list-parts>
  </div>
</template>

<script setup lang="ts">
import SimpleListParts from "@/components/parts/SimpleListParts.vue";

</script>

<style scoped>

.pagemain {
  transition: margin-left .5s;
  padding: 20px;
}

</style>