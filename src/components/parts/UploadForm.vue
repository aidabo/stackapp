<template>
    <form @submit.prevent="submitForm">
        <div class="my-custom-grid-item-content">
            <button @click=handleRemove>X</button>
            <p>
                Vue Grid Item Content UploadForm {{ itemId }}
            </p>
            <div>  
                <input type="file" @change="onFileChange">  
                <p v-if="selectedFile">选定的文件名: {{ selectedFile.name }}</p>  
            </div>  
            <button type="submit">Upload</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    itemId: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["remove", "submit"])
const handleRemove = () => {
    alert(props.itemId)
    emit('remove', props.itemId)
}

const selectedFile: any = ref(null); 
  
const onFileChange = (event: any) => {  
    const file = event.target.files[0];  
    if (file) {  
      selectedFile.value = file;  
    }  
}  

const submitForm = () => {
    alert(props.itemId + ", " + selectedFile.name);
    emit("submit", props.itemId);
};
</script>