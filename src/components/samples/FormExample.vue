<template>
  <div class="flex flex-col mx-4">
    <Suspense>
      <FormKitProvider :config="FormKitConfig">
        <FormKit
          type="form"
          :id="uid"
          :form-class="submitted ? 'hide' : 'show'"
          submit-label="Register"
          @submit="submitHandler"
          :actions="false"
          #default="{ value }"
        >
          <h1 class="text-2xl font-bold mb-2">Register!</h1>
          <p class="text-sm mb-4">
            You can put any type of element inside a form, not just FormKit
            inputs (although only FormKit inputs are included with the
            submission).
          </p>
          <FormKit
            type="text"
            name="name"
            label="Your name"
            placeholder="Jane Doe"
            help="What do people call you?"
            validation="required"
          />
          <FormKit
            type="text"
            name="email"
            label="Your email"
            placeholder="jane@example.com"
            help="What email should we use?"
            validation="required|email"
          />
          <div class="double">
            <FormKit
              type="password"
              name="password"
              label="Password"
              validation="required|length:6|matches:/[^a-zA-Z]/"
              :validation-messages="{
                matches: 'Please include at least one symbol',
              }"
              placeholder="Your password"
              help="Choose a password"
            />
            <FormKit
              type="password"
              name="password_confirm"
              label="Confirm password"
              placeholder="Confirm password"
              validation="required|confirm"
              help="Confirm your password"
            />
          </div>

          <FormKit type="submit" label="Register" />
          <pre wrap>{{ value }}</pre>
        </FormKit>
      </FormKitProvider>
    </Suspense>
    <div v-if="submitted">
      <h2 class="text-xl text-green-500">Submission successful!</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { FormKit, FormKitProvider } from "@formkit/vue";
import FormKitConfig from "@/config/FormKitConfig";
import {
  createStackComponentRefs,
  StackCompProps,
} from "@/components/layout/StackEvent";
import { Notification } from "@arco-design/web-vue";

const props = defineProps<StackCompProps>();

const submitted = ref(false);

const uid = ref(uuidv4());

const myform = ref(null);

const gsData: any = ref();

const registerCallback = () => {
  if (props.gsRegister) {
    props.gsRegister(
      props.cid,
      createStackComponentRefs(props.gsComponent, gsData.value, {})
    );
  }
};

const loadInitailData = () => {};

onMounted(() => {
  registerCallback();
  loadInitailData();
});

watch(
  gsData,
  (newValue, oldValue) => {
    if (props.gsItemChanged) {
      props.gsItemChanged({ srcId: props.cid, data: gsData.value });
    }
  },
  { deep: true }
);

const submitHandler = async (form: any) => {
  const { values, errors } = form;
  console.log("values:", values, "\nerrors:", errors);
  if (!errors) {    
    await props.gsSave(
      {
        srcId: props.cid,
        source: {cid: props.cid, cname: props.gsComponent.cname, aliasName: props.gsComponent.aliasName},
        data: form || {},
      },
      (result: any) => {
        if (result === false) {
          Notification.error("Save Arcoform Failure: " + result);
        } else {
          Notification.success("Save Arcoform successfully: " + result.id);
        }
      }
    );
    //submitted.value = true;
  }
};
</script>
