<script lang="ts" setup>
    const props = defineProps<{
        res: Object,
        onUpdate?: (checked: boolean)=>void,
    }>()
</script>

<template>
    <label :for="'checkbox-name-popover-' + res.id" class="checkbox-name">
        <div class="checkbox-name__checkbox-block">
            <ElementCheckbox 
                :id="'checkbox-name-popover-' + res.id" 
                name="checkbox_name_popover"
                :on-update="props.onUpdate"
            >{{ res.title }}
            </ElementCheckbox>
            <ElementPopover>
            </ElementPopover>
        </div>
        <div class="checkbox-name__price">
            от {{ res.price }} ₽
        </div>
    </label>
</template>

<style lang="scss">
    .checkbox-name {
        @include df_ac;
        gap: 1.5rem;
        padding: 1rem;
        background-color: $bg-inverse-transparent-4;
        border-radius: .5rem;
        cursor: pointer;
        &__checkbox-block {
            @include df_ac;
            gap: .25rem;
            width: 100%;
        }
        &__price {
            @include text_1;
            color: $text-primary-transparent-48;
            text-wrap: nowrap;
        }
        &:hover {
            .custom-checkbox-label {
                &::before {
                    background-color: $bg-inverse-transparent-16;
                }
            }
        }
        &:has(input:checked) {
            .custom-checkbox-label {
                &::before {
                    background-color: $bg-subaccent;
                }
            }
        }
    }
</style>