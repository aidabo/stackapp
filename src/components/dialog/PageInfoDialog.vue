<template>
    <a-modal v-model:visible="visible" @ok="handleOk" draggable unmount-on-close :hide-cancel="true">
        <template #title>
            Page Layout Info
        </template>
        <a-space direction="vertical" size="large" fill>
          <a-textarea v-model="pageInfo" class="h-80" allow-clear show-word-limit />
        </a-space>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    items: {
        type: Object,
        default: []
    }    
});

const visible = ref(false);
const pageInfo = ref("")

watch(props, ()=>{
    visible.value = props.show;
    pageInfo.value = JSON.stringify(props.items || [], null, "  ");
})

const handleOk = async () => {
    visible.value = false;
};

</script>

<style scoped></style>