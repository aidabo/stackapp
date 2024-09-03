<template>
    <div class="layout-demo">
        <div :style="{ background: 'var(--color-fill-2)', padding: '5px' }">
            <a-page-header :style="{ background: 'var(--color-bg-2)' }" title="ArcoDesign" subtitle="ArcoDesign Vue 2.0"
                :show-back="false">
                <!-- <template #breadcrumb>
                    <a-breadcrumb>
                        <a-breadcrumb-item>Home</a-breadcrumb-item>
                        <a-breadcrumb-item>Channel</a-breadcrumb-item>
                        <a-breadcrumb-item>News</a-breadcrumb-item>
                    </a-breadcrumb>
                </template> -->
                <template #extra>
                    <a-link href="link" @click.prevent="handleRemove">
                        <template #icon><icon-close/></template>
                        Close
                    </a-link>
                </template>
            </a-page-header>
        </div>

        <a-layout style="min-height: 300px;">
            <!-- <a-layout-header>Header</a-layout-header> -->
            <a-layout-content>Content</a-layout-content>
            <!-- <a-layout-footer>Footer</a-layout-footer> -->
        </a-layout>
    </div>
</template>

<script setup lang="ts">
 import { IconClose } from '@arco-design/web-vue/es/icon';

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

</script>

<style scoped>
.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}


.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
    height: 64px;
    background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.arco-layout-sider) {
    width: 206px;
    background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.arco-layout-content) {
    background-color: rgb(var(--arcoblue-6));
}
</style>