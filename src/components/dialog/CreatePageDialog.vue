<template>
    <a-modal v-model:visible="visible" title="Modal Form" @cancel="handleCancel" @ok="handleOk" draggable unmount-on-close>
        <template #title>
            Create new page
        </template>
        <a-form :model="form">
            <div>Input page title and select a category</div>
            <a-form-item field="name" label="Name">
                <a-input v-model="form.title" />
            </a-form-item>
            <a-form-item field="post" label="Post">
                <a-select v-model="form.category">
                    <a-option v-for="option in options" :value="option.value">{{ option.text }}</a-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    done: Function,
    cancel: Function
});

const visible = ref(false);

const form = reactive({
    title: '',
    category: ''
});

const options = reactive([
    { text: "test1", value: "test1" },
    { text: "test2", value: "test2" },
    { text: "test3", value: "test3" },
    { text: "test4", value: "test4" }
]); 

watch(props, ()=>{
    visible.value = props.show;
})

const handleOk = async () => {
    if (props.done) {
        const result = await props.done(form);
        console.log("result", result);
    } else {
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
};

const handleCancel = async() => {
    if(props.cancel){
        await props.cancel();
    }
};

</script>

<style scoped></style>