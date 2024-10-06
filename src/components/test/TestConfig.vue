<template>
  <Suspense>
  <StackConfigLoader :config-file="`../dynamic/stack.config`" :default-config="false">
    <TestLoad></TestLoad>
  <GridStackPage id="page_8ac5643a-8a52-4976-9686-efcebc325b1f"></GridStackPage>
</StackConfigLoader>
</Suspense>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"
import TestLoad from "@/components/test/TestLoad.vue"
import { StackConfigLoader } from '../layout/StackLayoutConfig';
import GridStackPage from "../layout/StackPage.vue";

</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}

</style>