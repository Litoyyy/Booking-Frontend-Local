<script lang="ts" setup>
    import BottomSheet from '~/layouts/components/BottomSheet.vue';
    const props = defineProps<{
        title?: string,
    }>()
</script>

<template>
    <BottomSheet
        theme="dark"
    >
    <div class="bottom-sheet__content">
        <div class="bottom-sheet__content__title" v-if="!!title">
            {{ title }}
        </div>
        <slot/>
    </div> 
    </BottomSheet>
</template>

<style lang="scss" scoped>
    .bottom-sheet {
        &__content {
            @include df_fdc;
            gap: .5rem;
            padding: 1rem;
            padding-top: .25rem;
            color: $text-inverse;
            @include text_1;
            &__title {
                @include heading_2;
            }
        }
    }
</style>