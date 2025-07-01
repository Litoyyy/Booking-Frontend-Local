<script setup lang="ts">
    const props = defineProps<{
        size?: 'basic' | 'large',
        color?: 
            'accent' | 
            'subaccent' | 
            'negative' | 
            'transparent' | 
            'outlined' | 
            'neutral' | 
            'neutral-subaccent',
        link?: string,
        state?: 'active' | 'disabled',
        disabled?: boolean,
        popoverText?: string,
        ghost?: boolean,
    }>();
</script>

<template>
    <NuxtLink v-if="link" class="button"
        :data-size="props.size || 'basic'"
        :data-color="props.color || 'accent'"
        :data-ghost="props.ghost"
        :data-state="props.state"
        :to=props.link
        :disabled=props.disabled
    ><slot />
    <ElementPopover v-if="popoverText"  
    >{{ popoverText }}
    </ElementPopover>
    </NuxtLink>
    <button v-else class="button"
        :data-size="props.size || 'basic'"
        :data-color="props.color || 'accent'"
        :data-ghost="props.ghost"
        :data-state="props.state"
        :disabled="props.disabled"
    ><slot />
    <ElementPopover v-if="popoverText"  
    >{{ popoverText }}
    </ElementPopover>
    </button>
</template>

<style lang="scss">
    button {
        cursor: pointer;
        border: none;
        background: none;
        outline: none;
        padding: 0;
        color: $text-primary;
        font-family: "Onest", sans-serif;
    }
    .button {
        @include df_ac_jcc;
        gap: .25rem;
        width: fit-content;
        text-wrap: nowrap;
        cursor: pointer;
        @include transition(background-color, border, border-color, color);

        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;

        svg {
            aspect-ratio: 1;
            path {
                // fill-opacity: 1;
                @include transition(fill, fill-opacity);
            }
        }

        &[data-size="basic"] {
            padding: .5rem .75rem;
            border-radius: 0.5rem;
            @include strong_1;
            @include mobile {
                padding: .5rem;
                border-radius: .375rem;
            }
            &[data-ghost="true"] {
                padding: 0;
                border-radius: 0;
            }
            &[popover] {
                padding-right: .5rem;
            }
        }
        &[data-size="large"] {
            padding: 1rem;
            border-radius: 0.5rem;
            @include strong_1;
            @include mobile {
                padding: .75rem;
                border-radius: .375rem;
            }
            &[data-ghost="true"] {
                padding: 0;
                border-radius: 0;
            }
        }


        
        &[data-color="accent"] {
            background-color: $bg-accent;
            color: $text-inverse;
            &:hover {
                background-color: $bg-inverse;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-inverse;
            }
            &[data-ghost="true"] {
                background-color: unset;
                color: $text-accent;
                &:hover {
                    color: $text-primary;
                }
                &:active,
                &[data-state="active"] {
                    color: $text-accent;
                }
            }
            &:disabled,
            &[data-state="disabled"] {
                background-color: $bg-inverse-transparent-16;
                color: $text-inverse;
            }
        }
        &[data-color="subaccent"] {
            background-color: $bg-subaccent;
            color: $text-inverse;
            &:hover {
                background-color: $bg-inverse;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-inverse;
            }
            &[data-ghost="true"] { 
                background-color: unset;
                color: $text-subaccent;
                &:hover {
                    color: $text-primary;
                }
                &:active,
                &[data-state="active"] {
                    color: $text-subaccent;
                }
            }
            &:disabled,
            &[data-state="disabled"] {
                background-color: $bg-inverse-transparent-16;
                color: $text-inverse;
            }
        }
        &[data-color="negative"] {
            background-color: $bg-system-negative;
            color: $text-inverse;
            &:hover {
                background-color: $bg-inverse;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-inverse;
            }
            &:disabled,
            &[data-state="disabled"] {
                background-color: $bg-inverse-transparent-16;
                color: $text-inverse;
            }
        }
        &[data-color="transparent"] {
            background-color: $bg-accent-transparent-4;
            color: $text-accent;
            &:hover {
                background-color: $bg-accent-transparent-8;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-accent;
                color: $text-inverse;
            }
            &:disabled,
            &[data-state="disabled"] {
                background-color: $bg-inverse-transparent-16;
                color: $text-inverse;
            }
        }
        &[data-color="outlined"] {
            border-width: 1px;
            border-style: solid;
            border-color: $border-primary-transparent-4;
            color: $text-primary;
            &[data-size="basic"] {
                color: $text-accent;
                border-color: $border-primary-transparent-8;
            }
            &:hover {
                border-color: $border-primary-transparent-16;
            }
            &:active,
            &[data-state="active"] {
                border-color: $border-accent;
                color: $text-accent;
            }
            &:disabled,
            &[data-state="disabled"] {
                color: $text-primary-transparent-16;
                border-color: rgba(255, 255, 255, 0);
            }
        }
        &[data-color="neutral"] {
            border-width: 1px;
            border-style: solid;
            border-color: rgba(255, 255, 255, 0);
            color: $text-primary;
            &:hover {
                border-color: $border-primary-transparent-8;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-accent;
                color: $text-inverse;
                border-color: rgba(255, 255, 255, 0);
            }
            &[data-state="filled"] {
                background-color: $bg-accent-transparent-4;
                color: $text-accent !important;
                border-radius: 0;
            }
            &[data-ghost="true"] {
                border: unset;
                background-color: unset;
                color: $text-primary-transparent-48;
                &:hover {
                    color: $text-primary;
                }
                &:active,
                &[data-state="active"] {
                    color: $text-primary;
                }
            }
            &:disabled,
            &[data-state="disabled"] {
                color: $text-primary-transparent-16;
            }
        }
        &[data-color="neutral-subaccent"] {
            border-width: 1px;
            border-style: solid;
            border-color: rgba(255, 255, 255, 0);
            color: $text-subaccent;
            &:hover {
                border-color: $border-primary-transparent-8;
                color: $text-primary;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-accent;
                color: $text-inverse;
                border-color: rgba(255, 255, 255, 0);
            }
            &:disabled,
            &[data-state="disabled"] {
                color: $text-primary-transparent-16;
            }
        }

        &:disabled,
        &[data-state="disabled"] {
            pointer-events: none;
        }
    }
</style>