<template>
  <div class="flex flex-col mx-4 text-left">
    <Suspense>
      <FormKitProvider :config="FormKitConfig">
        <FormKit type="form" v-model="gsData" @submit="handleSubmit">
          <FormKitSchema :schema="schema" :data="gsData" />
        </FormKit>
      </FormKitProvider>
    </Suspense>
  </div>
  <pre
    >{{ gsData }}
</pre
  >
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { FormKitSchema, FormKit, FormKitProvider } from "@formkit/vue";
import FormKitConfig from "@/config/FormKitConfig";
import {
  createStackComponentRefs,
  StackCompProps,
} from "@/components/layout/StackEvent";
import { Notification } from "@arco-design/web-vue";

const props = defineProps<StackCompProps>();

const schema = [
  {
    $formkit: "text",
    name: "name",
    label: "Full Name",
    placeholder: "Enter your name...",
  },
  {
    $formkit: "checkbox",
    name: "hasEmail",
    label: "Has Email?",
  },
  {
    $el: "p",
    children: ["Email enabled? ", "$hasEmail"],
  },
  {
    $formkit: "email",
    name: "email",
    label: "Email",
    if: "$hasEmail",
    validation: "required|email",
  },
];

const gsData = ref({
  name: null,
  email: null,
  hasEmail: false,
});

const registerCallback = () => {
  if (props.gsRegister) {
    props.gsRegister(
      props.cid,
      createStackComponentRefs(props.gsComponent, null, {})
    );
  }
};

onMounted(() => {
  registerCallback();
});

const handleSubmit = async (form: any) => {
  const { values, errors } = form;
  console.log("values:", values, "\nerrors:", errors);
  if (!errors) {
    await props.gsSave(
      {
        srcId: props.cid,
        source: {
          cid: props.cid,
          cname: props.gsComponent.cname,
          aliasName: props.gsComponent.aliasName,
        },
        data: form || {},
      },
      (result: any) => {
        if (result === false) {
          Notification.error("Save FormKitSummary Failure: " + result);
        } else {
          Notification.success(
            "Save FormKitSummary successfully: " + result.id
          );
        }
      }
    );
  }
};
</script>
