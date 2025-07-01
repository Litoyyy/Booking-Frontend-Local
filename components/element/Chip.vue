<script lang="ts" setup>
    const props = defineProps<{
        dotColor?: string,
    }>();
</script>

<template>
    <div class="info-chips">
        <div class="info-chips__dot" :style="{'--dot-color': props.dotColor}"></div>
        <slot />
    </div>
</template>

<style lang="scss">
    .info-chips {
        @include df_ac;
        gap: .5rem;
        @include text_2;
        &__dot {
            content: '';
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background-color: var(--dot-color);
        }
    }
</style>