<template>
  <slot name="stack"></slot>
  <a-form
    ref="formRef"
    :size="gsData.size"
    :model="gsData"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="size" label="Form Size">
      <a-radio-group v-model="gsData.size" type="button">
        <a-radio value="mini">Mini</a-radio>
        <a-radio value="small">Small</a-radio>
        <a-radio value="medium">Medium</a-radio>
        <a-radio value="large">Large</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="name"
      label="Username"
      :rules="[
        { required: true, message: 'name is required' },
        { minLength: 5, message: 'must be greater than 5 characters' },
      ]"
      :validate-trigger="['change', 'input']"
    >
      <a-input
        v-model="gsData.name"
        placeholder="please enter your username..."
      />
    </a-form-item>
    <a-form-item
      field="age"
      label="Age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', max: 200, message: 'age is max than 200' },
      ]"
    >
      <a-input-number
        v-model="gsData.age"
        placeholder="please enter your age..."
      />
    </a-form-item>
    <a-form-item
      field="section"
      label="Section"
      :rules="[{ match: /section one/, message: 'must select one' }]"
    >
      <a-select
        v-model="gsData.section"
        placeholder="Please select ..."
        allow-clear
      >
        <a-option value="section one">Section One</a-option>
        <a-option value="section two">Section Two</a-option>
        <a-option value="section three">Section Three</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="province"
      label="Province"
      :rules="[{ required: true, message: 'province is required' }]"
    >
      <a-cascader
        v-model="gsData.province"
        :options="options"
        placeholder="Please select ..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="options"
      label="Options"
      :rules="[
        {
          type: 'array',
          minLength: 2,
          message: 'must select greater than two options',
        },
      ]"
    >
      <a-checkbox-group v-model="gsData.options">
        <a-checkbox value="option one">Section One</a-checkbox>
        <a-checkbox value="option two">Option Two</a-checkbox>
        <a-checkbox value="option three">Option Three</a-checkbox>
        <a-checkbox value="option four">Option Four</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item field="date" label="Date">
      <a-date-picker v-model="gsData.date" placeholder="Please select ..." />
    </a-form-item>
    <a-form-item field="time" label="Time">
      <a-time-picker v-model="gsData.time" placeholder="Please select ..." />
    </a-form-item>
    <a-form-item
      field="radio"
      label="Radio"
      :rules="[{ match: /one/, message: 'must select one' }]"
    >
      <a-radio-group v-model="gsData.radio">
        <a-radio value="radio one">Radio One</a-radio>
        <a-radio value="radio two">Radio Two</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="slider"
      label="Slider"
      :rules="[{ type: 'number', min: 5, message: 'slider is min than 5' }]"
    >
      <a-slider v-model="gsData.slider" :max="10" />
    </a-form-item>
    <a-form-item field="score" label="Score">
      <a-rate v-model="gsData.score" allow-clear />
    </a-form-item>
    <a-form-item
      field="switch"
      label="Switch"
      :rules="[{ type: 'boolean', true: true, message: 'must be true' }]"
    >
      <a-switch v-model="gsData.switch" />
    </a-form-item>
    <a-form-item field="multiSelect" label="Multiple Select">
      <a-select
        v-model="gsData.multiSelect"
        placeholder="Please select ..."
        multiple
      >
        <a-option value="section one">Section One</a-option>
        <a-option value="section two">Section Two</a-option>
        <a-option value="section three">Section Three</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="treeSelect" label="Tree Select">
      <a-tree-select
        :data="treeData"
        v-model="gsData.treeSelect"
        placeholder="Please select ..."
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit">Submit</a-button>
        <a-button @click="formRef.resetFields()">Reset</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, inject } from "vue";
import {
  createStackComponentRefs,
  StackCompProps,
  StackEvent,
  createStackEvent,
} from "@/components/layout/StackEvent";
import { Notification } from "@arco-design/web-vue";

const formRef: any = ref(null);

const props = defineProps<StackCompProps>();

const treeData = ref<any>();

const options = ref<any>();

const gsData: any = ref({
  id: "",
  cid: props.cid,
  cname: props.StackComponent.cname,
  size: "medium",
  name: "",
  age: undefined,
  section: "",
  province: "haidian",
  options: [],
  date: "",
  time: "",
  radio: "radio one",
  slider: 5,
  score: 5,
  switch: false,
  multiSelect: ["section one"],
  treeSelect: "",
});

const registerCallback = () => {
  if (props.gsRegister) {
    props.gsRegister(
      props.cid,
      createStackComponentRefs(props.StackComponent, gsData.value, { test1, test2 })
    );
  }
};

const loadInitailData = () => {  
  options.value = props.StackComponent.data.options;
  treeData.value = props.StackComponent.data.treeData;
  //option:
  props.gsLoad(
    { srcId: props.cid, data: { id: "104fcd51-b38f-4e21-bb03-4edf79a64aa6" } },
    (result: any) => {
      if (result) {
        gsData.value = result;
      }
    }
  );
};

onMounted(() => {
  registerCallback();
  loadInitailData();
});

const test1 = async (event: StackEvent, callback?: Function) => {
  alert("test1 called ArcoForm");
  return await new Promise((resolve) =>
    setTimeout(
      () => resolve(event.data + " !! test1 result " + props.cid),
      2000
    )
  );
};

const test2 = (event: StackEvent, callback?: Function) => {
  alert("test2 called ArcoForm");
  return event.data + " !! test2 result " + props.cid;
};

watch(
  gsData,
  (newValue, oldValue) => {
    if (props.gsItemChanged) {
      props.gsItemChanged({ srcId: props.cid, data: gsData.value });
    }
  },
  { deep: true }
);

const handleSubmit = async (form: any) => {
  const { values, errors } = form;
  console.log("values:", values, "\nerrors:", errors);
  if (!errors || errors.length == 0) {
    await props.gsSave(
      {
        srcId: props.cid,        
        data: gsData.value,
      },
      (result: any) => {
        if (result === false) {
          Notification.error("Save Arcoform Failure: " + result);
        } else {
          Notification.success("Save Arcoform successfully: " + result.id);
        }
      }
    );
  }
};
</script>
