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
    <label class="custom-checkbox-label"
        :for="id || 'custom-checkbox-id'"
        :data-size="size || 'basic'"
    ><input type="checkbox" 
        :name="name" 
        :id="id || 'custom-checkbox-id'"
        :checked="checked"
        @click="(event: Event)=>{
            const target = event.target as HTMLInputElement;
            if(onUpdate) onUpdate(target.checked);
        }"
    ><slot />
    </label>
</template>

<style lang="scss">
    .custom-checkbox-label {
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
            border-radius: .25rem;
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