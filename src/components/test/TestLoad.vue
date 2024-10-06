<template>
  <div class="flex flex-col mx-6">
    <hr
      class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-6 dark:bg-gray-700"
    />
    <div>
      <button class="p-4 bg-orange-300 m-3" @click="loadEventHandler">Load handler</button>
      <button class="p-4 bg-orange-300 m-3" @click="loadLayoutStore">Load layout store</button>
      <button class="p-4 bg-orange-300 m-3" @click="loadDataStore">Load data store</button>
      <button class="p-4 bg-orange-300 m-3" @click="loadComponent">load Props</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { eventSymbol } from "../layout/StackLayoutConfig";
import { useDynamicLoader } from "../layout/StackDynamicLoader";
import camelCase from 'camelcase';

const config: any = inject(eventSymbol.gsPageConfigOptions, {
  default: () => false,
});

const { importHandler, importDataStore, importComponent, importLayoutStore } = useDynamicLoader();

const loadEventHandler = async () => {
  if (config) {
    console.log("custom config", config);
    let handler = await importHandler(config)
    if(handler !== false){
        handler = handler();
        console.log("found handler: ", handler);
    }
  }
};

const loadDataStore = async() =>{
    if (config) {
    console.log("custom config", config);
    let store = await importDataStore(config);
    if(store !== false){
      store = store();
      console.log("found store: ", store);
    }
  }
}

const loadLayoutStore = async() =>{
    if (config) {
    console.log("custom config", config);
    let store = await importLayoutStore(config);
    if(store !== false){
      store = store();
      console.log("found layout store: ", store);
    }
  }
}

const loadComponent = async () => {
    const cname = "arcoform"  
  const componentInfo = await importComponent(cname);
  if(componentInfo !== false){      
      const [ component, props] = componentInfo;
      console.log("found component: ", component, props);
  }
};


</script>
