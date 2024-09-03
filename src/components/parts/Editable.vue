<template>  
    <div  
      :class="{ 'editable-component': true, 'is-editable': isEditable }"  
      contenteditable="true"  
      @focus="setIsEditable(true)"  
      @blur="setIsEditable(false)"  
      @input="updateContent"  
      @keydown.esc.prevent="setIsEditable(false)"  
    >  
      {{ content }}  
    </div>  
  </template>  
    
  <script setup lang="ts">  
  import { ref } from 'vue';  
    
  const content = ref('This is a test for edit'); // Assuming you have some initial content or you'll set it dynamically  
  const isEditable = ref(false);  
    
  // Function to update the content when the user types  
  function updateContent(event: any) {  
    content.value = event.target.innerHTML;  
  }  
    
  // Function to toggle the editable state based on focus/blur events  
  function setIsEditable(newValue: boolean) {  
    isEditable.value = newValue;  
  }  
  </script>  
    
  <style scoped>  
  
  .editable-component {  
    padding: 10px;  
    border: 1px solid #ccc;  
    min-height: 50px;  
    transition: box-shadow 0.3s ease;  
    outline: none; /* Remove the default outline when the div is focused */  
  }  
    
  .editable-component.is-editable {  
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Slight shadow effect when editable */  
  }  
  </style>