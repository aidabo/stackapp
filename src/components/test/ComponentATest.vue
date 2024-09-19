<template>
  <!-- <div class="flex flex-col min-w-max"> -->
    <!-- <div class="p-4 text-left text-green-400 text-2xl">This is ComponentA</div>
    <a-input
      :style="{ width: '280px' }"
      v-model="bProps.description"
      placeholder="id"
      allow-clear
    />
    <div class="p-4 text-left"> -->
      <component-b
        :b-props="bProps"
        :on-load="onLoad"
        :on-save="onSave"
        @griditem:item-changed="onItemChanged"
      >
        <template #stack>
          <div class="justify-center m-5">
            <span class="text-red-400 font-bold">this is slot stack</span>
          </div>
        </template>
        <template #foo>
          <div class="justify-center m-5">
            <span class="text-cyan-400 font-bold">this is slot stack</span>
          </div>
        </template>
        <div class="justify-center m-5">
            <span class="text-green-400 font-bold">this is default slot</span>
        </div>
      </component-b>
    <!-- </div>
    <div class="p-4 text-left">
      this is component A, received data from component B <br />
      {{ myform }}{{ mydata }}
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { h, ref, defineProps, defineComponent, PropType, reactive } from "vue";
import ComponentB from "@/components/test/ComponentB.vue";
import { ComponentBProps } from "./ComponentBProps";
import { v4 as uuidv4 } from "uuid";
import { Base64 } from "js-base64";

const bProps: ComponentBProps = reactive({
  id: uuidv4(),
  name: Base64.encode(uuidv4()),
  description: "test component b prop",
  data: { name: "aidabo" },
  storeUrl: "http://localhost",
});

const onLoad = (id: string) => {
  alert("onload callback:  " + id);
  return { id: id, data: { content: "This is data loaded" } };
};

const onSave = (event: any) => {
  const [form, data] = event;
  myform.value = form;
  mydata.value = data;
  alert("onSave event callback: " + JSON.stringify(event));
};

const myform = ref({});
const mydata = ref({});

const onItemChanged = (event: any) => {
  const [form, data] = event;
  myform.value = form;
  mydata.value = data;
};
</script>
