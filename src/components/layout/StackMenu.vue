<template>
  <div class="absolute top-1 right-1 text-xl grid-menu">   
    <div class="text-right">
      <a href="#" class="menubtn" @click.prevent="toggleMenu">
        <i class="fa fa-solid fa-pen-to-square"></i>
      </a>
    </div>
    <div v-if="showMenu" class="flex flex-col">
      <div class="size-30">
        <a-popconfirm
          content="Are you sure you want to delete grid "
          type="info"
          @ok="onDelete"
        >
          <a-button type="secondary" class="text-lg" :disabled="!lastGrid"
            ><icon-delete />Delete</a-button
          >
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watchEffect } from "vue";

const props = defineProps({
  gridId: {
    type: String,
    required: true,
  },
  lastGrid: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(["grid:remove"]);

const showMenu = ref(true);

const toggleMenu = () => {
  console.log("toggle stackmenu: " + showMenu + " " + props.lastGrid);
  showMenu.value = !showMenu.value;
};

const onDelete = () => {
  emit("grid:remove", props.gridId);
  showMenu.value = !showMenu.value;
};

const alertMe = () =>{
  alert("...me");
}

watchEffect(()=>{
  console.log("watch: " + showMenu + " " + props.lastGrid);
})

onMounted(()=>{
  console.log("toggle stackmenu: " + showMenu + " " + props.lastGrid);
})

</script>

<style scoped>

.menubtn {
  font-size: 1.0rem;
}

.grid-menu {
  z-index: 1;
}

</style>
