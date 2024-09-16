<template>
  <div class="absolute top-1 right-1 text-xl">
    <i
      v-if="!showMenu"
      class="fa-solid fa-pen-to-square grid-menu"
      @click.prevent="toggleMenu"
    ></i>
    <div v-else class="flex flex-col">
      <div class="size-30">
        <a-popconfirm
          content="Are you sure you want to delete grid "
          type="info"
          @ok="onDelete"
        >
          <a-button type="secondary" class="text-lg"
            ><icon-delete />Delete</a-button
          >
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const props = defineProps({
  gridId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["grid:remove"]);

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const onDelete = () => {
  emit("grid:remove", props.gridId);
  showMenu.value = !showMenu.value;
};
</script>

<style scoped></style>
