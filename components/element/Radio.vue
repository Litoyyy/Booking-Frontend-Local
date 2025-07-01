<script setup lang="ts">
    const props = defineProps<{
        size?: 'basic' | 'small',
        id?: string,
        name?: string,
        onUpdate?: (checked: boolean) => void,
        checked?: boolean,
    }>();
</script>

<template>
    <label class="custom-radio-label"
        :for="props.id || 'custom-checkbox-id'"
        :data-size="props.size || 'basic'"
    ><input type="radio" 
        :name="props.name" 
        :id="props.id || 'custom-checkbox-id'"
        :checked="props.checked"
        @click="(event: Event)=>{
            const target = event.target as HTMLInputElement;
            if(props.onUpdate) props.onUpdate(target.checked);
        }"
    ><slot />
    </label>
</template>

<style lang="scss">
    .custom-radio-label {
        position: relative;
        @include df_ac;
        gap: .5rem;
        cursor: pointer;

        @include mobile {
            gap: .375rem;
        }
        input {
            opacity: 0;
        }

        &[data-size="basic"] {
            @include text_1;
            input {
                height: 1.25rem;
                aspect-ratio: 1;
                @include mobile {
                    height: 1.125rem;
                }
            }
            &::before {
                height: 1.25rem;
                aspect-ratio: 1;
                @include mobile {
                    height: 1.125rem;
                }
            }
            &::after {
                left: .3125rem;
                height: .625rem;
                aspect-ratio: 1;
                @include mobile {
                    height: .5rem;
                }
            }
        }
        &[data-size="small"] {
            @include text_2;
            input {
                height: 1rem;
                aspect-ratio: 1;
                @include mobile {
                    height: .875rem;
                }
            }
            &::before {
                height: 1rem;
                aspect-ratio: 1;
                @include mobile {
                    height: .875rem;
                }
            }
            &::after {
                left: .25rem;
                height: .5rem;
                aspect-ratio: 1;
                @include mobile {
                    height: .375rem;
                }
            }
        }

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: $bg-inverse-transparent-8;
            border-radius: 50%;
            @include transition(background-color);
        }
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: $bg-primary;
            border-radius: 50%;
            @include transition(opacity);
            opacity: 0;
        }

        &:hover {
            &::before {
                background-color: $bg-inverse-transparent-16;
            }
        }
        &:has(input:checked) {
            &::before {
                background-color: $bg-subaccent;
            }
            &::after {
                opacity: 1;
            }
        }
    }
</style>