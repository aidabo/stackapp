<template>
  <div>
    <div v-for="item in gsComponentData" class="newWidget grid-stack-item dragNewItem">
      <div class="grid-stack-item-content drag" :gscomponent="gsGetComponentInfo(item.name)">
        <div>
          <i class="fa fa-solid fa-plus" style="font-size: 200%"></i>
        </div>
        <div>
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageComponents } from '@/components/layout/usePageComponents';

const { gsComponentData, gsGetComponentInfo } = usePageComponents();

</script>
