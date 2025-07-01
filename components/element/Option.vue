<script setup lang="ts">
    const props = defineProps<{
        type?: 'default' | 'checkbox' | 'radio' | 'ghost' | 'large-mobile',
        id?: string,
        name?: string,
        state?: string,
        onClick?: (checked: boolean) => void,
        checked?: boolean,
    }>();

    const handleClick = (checked: boolean) => {
        if (props.onClick) {
            props.onClick(checked);
        };
    };
</script>

<template>
    <div class="option"
        :for="props.id"
        :data-type="props.type || 'default'"
        :data-state="props.state"
        @click="handleClick(true)"
        v-if="type == 'default' || props.type == 'ghost' || props.type == 'large-mobile' || !props.type"
    ><slot />
    </div>
    <label class="option"
        :for="props.id"
        :data-type="props.type || 'default'"
        :data-state="props.state"
        v-else
    ><slot />
        <ElementCheckbox
            v-if="type == 'checkbox'"
            size="small"
            :id="props.id"
            :name="props.name"
            :checked="props.checked"
            :onUpdate="handleClick"/>
        <ElementRadio
            v-if="type == 'radio'"
            size="small"
            :id="props.id"
            :name="props.name"
            :checked="props.checked"
            :onUpdate="handleClick"/>
    </label>
</template>

<style lang="scss">
    .option {
        @include df_ac;
        gap: .25rem;
        @include text_2;
        @include transition(background-color, color);
        cursor: pointer;

        padding: .5rem 1rem;
        color: $text-primary-transparent-48;
        background-color: $bg-primary;
        border-radius: .5rem;

        a {
            color: $text-primary-transparent-48;
        }
        @include mobile {
            padding: .75rem 1.5rem;
            border-radius: .375rem;
        }

        &[data-type="default"],
        &[data-type="checkbox"],
        &[data-type="large-mobile"] {
            text-wrap: nowrap;
            &:hover {
                background-color: $bg-inverse-subdued-4;
                .custom-checkbox-label::before {
                    background-color: $bg-inverse-transparent-16;
                }
                &:has(input:checked) {
                    .custom-checkbox-label::before {
                        background-color: $bg-subaccent;
                    }
                }
            }
            &[data-state="active"],
            &:has(input:checked) {
                background-color: $bg-primary;
                color: $text-primary;
            }
        }
        &[data-type="ghost"] {
            &:hover {
                color: $text-primary;
            }
            &[data-state="active"] {
                color: $text-accent;
            }
        }
        &[data-type="checkbox"] {
            justify-content: space-between;
        }
        &[data-type="radio"] {
            justify-content: space-between;
            &:hover {
                .custom-radio-label::before {
                    background-color: $bg-inverse-transparent-16;
                }
                &:has(input:checked) {
                    .custom-radio-label::before {
                        background-color: $bg-subaccent;
                    }
                }
            }
            &[data-state="active"],
            &:has(input:checked) {
                background-color: $bg-primary;
                color: $text-primary;
            }
        }
        &[data-type="default"] {
            @include mobile {
                @include text_2;
                padding: .25rem .75rem;
                background-color: $bg-inverse-subdued-4;
            }
        }
    }
</style>