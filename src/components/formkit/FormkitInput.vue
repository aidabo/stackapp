<template>
  <div class="flex flex-col">
    <Suspense>
      <FormKitProvider :config="FormKitConfig">
        <FormKit
          prefix-icon="filePdf"
          suffix-icon="search"
          label="Prefix & suffix"
        />
        <FormKit type="select" select-icon="caretDown" label="Select control" />
        <FormKit
          type="file"
          file-item-icon="fileAudio"
          file-remove-icon="trash"
          label="File icons"
          help="Add a file to see the trash icon."
        />
      </FormKitProvider>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { FormKit, FormKitProvider } from "@formkit/vue";
import FormKitConfig from "@/config/FormKitConfig";
</script>
