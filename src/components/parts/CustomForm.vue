<template>
    <form @submit.prevent="submitForm">
        <div class="my-custom-grid-item-content">
            <button @click=handleRemove>X</button>
            <p>
                Vue Grid Item Content CustomForm {{ itemId }}
            </p>
            <div>
                <input type="text" v-model="gsData.name" placeholder="Enter your name" />
            </div>
            <div>
                <input type="email" v-model="gsData.email" placeholder="Enter your email" />
            </div>
            <button type="submit">Submit</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const gsData = ref({
    name: "",
    email: ""
})

const props = defineProps({
    itemId: String,
    cid: String,
    gsProps: {
        type: Object,
        required: true,
    },
    gsInitData: Object,
});

const setInitData = () => {
    if (props.gsInitData) {
        gsData.value = props.gsInitData as any;
    }
}

onMounted(() => {
    setInitData();
});

const emit = defineEmits(["remove", "itemChanged", "submit"])

const handleRemove = () => {
    emit('remove', props.itemId)
}

const submitForm = () => {
    emit("submit", props.itemId, gsData.value);
};

watch(gsData, (newValue, oldValue) => {
    emit("itemChanged", props, gsData.value);
}, { deep: true })

</script>