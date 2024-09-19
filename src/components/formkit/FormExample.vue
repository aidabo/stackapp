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

const submitted = ref(false);

const submitHandler = async () => {
  await new Promise((r) => setTimeout(r, 1000));
  submitted.value = true;
};

const uid = ref(uuidv4());

const props = defineProps({
  itemId: String,
  cid: String,
  gsProps: {
    type: Object,
    required: false,
  },
  gsInitData: Object,
});

const gsData: any = ref(null);

const setInitData = () => {
  if (props.gsInitData) {
    gsData.value = props.gsInitData as any;
  }
};

onMounted(() => {
  setInitData();
});

const emit = defineEmits(["remove", "itemChanged", "submit"]);

const handleRemove = () => {
  emit("remove", props.itemId);
};

watch(
  gsData,
  (newValue, oldValue) => {
    emit("itemChanged", props, gsData.value);
  },
  { deep: true }
);

const handleSubmit = (form: any) => {
  const { values, errors } = form;
  console.log("values:", values, "\nerrors:", errors);
  if (!errors) {
    emit("submit", props.itemId, gsData.value);
  }
};
</script>
