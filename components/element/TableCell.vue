<script lang="ts" setup>
    const props = defineProps<{
        type: 'checkbox' | 'icon' | 'toggle' | 't1',
        id?: string,
        link?: string,
    }>();
</script>

<template>
    <div class="table-cell" :data-type="type">
        <ElementCheckbox size="basic" :id="id" v-if="type === 'checkbox'"/>
        <ElementToggle :id="id" v-else-if="type === 'toggle'"/>
        <slot/>
    </div>
</template>

<style lang="scss">
    .table-cell {
        display: flex;
        padding: 1rem;
        @include mobile {
            padding: .75rem;
        }
        svg {
            height: 1.5rem;
            aspect-ratio: 1;
        }
    }
</style>