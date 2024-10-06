<template>
  <div class="flex flex-col min-w-max border-solid border-2 border-indigo-600">
    <div class="p-4 text-left">
      <div class="text-2xl"> This is ComponentB</div>
      <a-button class="mx-4" type="primary" @click="onsave"> save data to ComponentA</a-button>
      <a-button class="mx-4" type="primary" @click="onload"> load data from ComponentA</a-button>
    </div>
    <div class="p-4 text-left">
      <a-space direction="vertical">
        <a-input
          :style="{ width: '280px' }"
          v-model="propData.description"
          placeholder="id"
          allow-clear
        />
        <a-input
          :style="{ width: '280px' }"
          v-model="myform.name"
          placeholder="Please enter name"
          allow-clear
        />
        <a-input
          :style="{ width: '280px' }"
          v-model="myform.email"
          default-value="test@jj.com"
          placeholder="Please enter email"
          allow-clear
        />
      </a-space>
    </div>
    <div class="p-4 text-left">
      <Suspense>
        <FormKitProvider :config="FormKitConfig">
          <FormKit type="form" v-model="schemaValues"           :actions="false"
          @submit="submitHandler">
            <FormKitMessages />
            <!-- 👀 form messages will appear here -->
            <FormKit type="text" label="Your Name" validation="required" />
            <FormKit
              type="checkbox"
              label="Top 3 headphones"
              validation-label="Headphones"
              :options="[
                'Galaxy buds',
                'Bowers & Wilkins PX8',
                'AirPods Pro',
                'AirPods Max',
                'Sony WH1000-XM4',
                'Bose 700',
              ]"
              validation="required|min:2"
            />

            <p>
              <em
                ><small class="mb-4"
                  >Submit to see moved messages. Normally messages are at the
                  bottom.</small
                ></em
              >
            </p>

            <FormKit type="submit" label="Send" />
          </FormKit>

        </FormKitProvider>
      </Suspense>
    </div>

    <div class="p-4">
      {{ bProps }}
    </div>
    <div class="p-4">
      {{ myform }}
    </div>
    <div class="p-4">
      {{ schemaValues }}
    </div>
    <slot></slot>
    <slot name="stack" />
    <slot name="foo" />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, onMounted } from "vue";
import { ComponentBProps } from "./ComponentBProps";
import { FormKit, FormKitProvider, FormKitMessages } from "@formkit/vue";
import FormKitConfig from "@/config/FormKitConfig";

const props = defineProps({
  bProps: {
    type: Object as PropType<ComponentBProps>,
    required: true,
  },
  onSave: Function as PropType<(...args: any[]) => void>,
  onLoad: Function as PropType<(...args: any[]) => void>,
});

const propData = ref<ComponentBProps>({} as any);

const myform = ref({
  name: "",
  email: "",
});

const schemaValues = ref();

onMounted(() => {
  if (props.bProps) {
    propData.value = props.bProps ?? {};
  }
});

watch(
  props.bProps,
  (newValue, oldValue) => {
    if (props.bProps) {
      propData.value = props.bProps ?? {};
    }
  },
  { deep: true }
);

watch(
  myform.value,
  (newValue, oldValue) => {
    emit("griditem:itemChanged", [myform, schemaValues]);
  },
  { deep: true }
);

watch(
  schemaValues.value,
  (newValue, oldValue) => {
    emit("griditem:itemChanged", [myform, schemaValues]);
  },
  { deep: true }
);

const emit = defineEmits(["griditem:itemChanged"]);

const onsave = (event: MouseEvent) => {
  alert("click event from ComponentB");
  emit("griditem:itemChanged", [myform, schemaValues]);
};

const onload = (event: MouseEvent) => {
  if(props.onLoad){
    props.onLoad(props.bProps.id);
  }
};

const submitHandler = async (_data: any, node: any) => {
  alert(JSON.stringify(_data));
  node.setErrors(["The server doesn’t like your name 😃. Sorry."]);
  //await new Promise((resolve) => setTimeout(resolve, 1000));
  if(props.onSave){
    await props.onSave([myform, schemaValues]);
  }
  emit("griditem:itemChanged", [myform, schemaValues]);
};

</script>

<style scoped></style>
