<template>
    <FormKit
      type="form"
      :submit-attrs="{
        inputClass: 'im-on-the-button',
        wrapperClass: 'im-on-the-wrapper',
        outerClass: 'im-on-the-outer-wrapper'
      }"
    >
      <FormKit
        type="text"
        label="FormKit Input"
        help="edit me to get started"
      />
    </FormKit>
  </template>
  
  <script>
  // You can use the options or composition APIs for your component,
  // Including `<script setup>` syntax. ESM Imports are unsupported
  // from URLS as well as secondary playground files.
  export default {}
  </script>
  
  <style>
  /*
  vanilla CSS can go here. If you are using
  Tailwind you can also use @apply rules.
  */
  </style>