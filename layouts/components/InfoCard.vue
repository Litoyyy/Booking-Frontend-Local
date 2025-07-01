<script lang="ts" setup>
    const props = defineProps<{
        size?: 'large' | 'basic',
        title?: string,
        color?: 'accent',
    }>();
</script>

<template>
    <div class="info-card" :size="props.size || 'basic'" :color="props.color">
        <div class="info-card__title">
            {{ title }}
            <slot name="title"></slot>
        </div>
        <slot />
    </div>
</template>

<style lang="scss">
    .info-card {
        @include df_fdc;
        background-color: $bg-inverse-transparent-4;
        border-radius: .5rem;
        padding: 1.5rem;
        gap: 1.5rem;
        &[color="accent"] {
            background-color: $bg-accent-transparent-4;
        }
        &__title {
            @include text_2;
            color: $text-primary-transparent-48;
            @include df_jb_ac;
            &[size="large"] {
                @include heading_3;
                color: $text-primary;
            }
        }
    }
</style>