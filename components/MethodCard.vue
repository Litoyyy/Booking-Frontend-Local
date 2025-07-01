<script lang="ts" setup>
    const props = defineProps<{
        name?: string,
        description?: string
    }>();
</script>

<template>
    <label id="method-card-radio-id" class="method-card">
        <ElementRadio id="method-card-radio-id" name="method-card-radio-name"></ElementRadio>
        <div class="method-card__title-block">
            {{ name }}
            <span>{{ description }}</span>
        </div>
    </label>
</template>

<style lang="scss">
    .method-card {
        @include df_ac;
        gap: 1rem;
        padding: 1rem;
        border-radius: .5rem;
        border: 1px solid $border-primary-transparent-8;
        cursor: pointer;

        grid-column: span 3;
        &__title-block {
            @include df_fdc;
            @include text_1;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
        &:hover {
            border-color: $border-primary-transparent-16;
            .custom-radio-label {
                &::before {
                    background-color: $bg-inverse-transparent-16;
                }
                &:has(input:checked) {
                    &::before {
                        background-color: $bg-subaccent;
                    }
                }
            }
        }
        &:has(input:checked) {
            border-color: $border-subaccent;
        }
    }
</style>