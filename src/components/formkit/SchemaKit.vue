<template>
  <Suspense>
    <FormKitProvider :config="FormKitConfig">
      <FormKit type="form" v-model="data" @submit="handleSubmit">
        <FormKitSchema :schema="schema" :data="data" />
      </FormKit>
    </FormKitProvider>
  </Suspense>
  <pre
    >{{ data }}
</pre
  >
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FormKitSchema, FormKit, FormKitProvider } from "@formkit/vue";
import FormKitConfig from "@/components/formkit/FormKitConfig";

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

const data = ref({
  name: null,
  email: null,
  hasEmail: false,
});

const handleSubmit = () => alert("Valid submit!");
</script>
