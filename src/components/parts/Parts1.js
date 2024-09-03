import {onBeforeUnmount, toRefs, ref } from "vue";
import { Base64 } from "js-base64"

export const Parts1 = () => {

  const GridContentComponent = {
    props: {
      itemId: {
        type: [String, Number],
        required: true,
      },
      componentName: {
        type: String,
        required: true,
      }
    },
    emits: ['remove'],
    setup(props, { emit }) {
      const { itemId } = toRefs(props)

      const username = ref("test0002");

      const componentData = ref(Base64.encode(JSON.stringify({
        name: "GridContentComponent"
      })))

      onBeforeUnmount(() => {
        console.log(`In vue onBeforeUnmount for item ${itemId.value}`)
      });

      function handleRemove() {
        alert("this is a test: " + username.value);
        emit('remove', itemId.value)
      }

      return {
        itemId,
        handleRemove,
      }
    },
    template: `
  <div class="my-custom-grid-item-content">
    <span class="myCustomGridItemComponentV1" style="width: 0; height: 0; display: none;">{{ componentData }}</span>
    <button @click=handleRemove>X</button>
    <p>
      Vue Grid Item Content Parts1 {{ itemId }}
    </p>
    <p>This is My Test Component**********</p>
    <input type="text" name="username" v-model="username" size=10>
    <custom-form></custom-form>
  </div>
`
  };

  return { GridContentComponent }
}
