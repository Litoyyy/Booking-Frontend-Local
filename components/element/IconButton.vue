
<script setup lang="ts">
    const props = defineProps<{
        size?: 'large' | 'basic' | 'small' | 'micro',
        color?: 
            'accent' | 
            'transparent' | 
            'transparent-secondary' | 
            'positive' | 
            'negative' | 
            'neutral' |
            'inverse' |
            'accent-blue' |
            'accent-green' |
            'accent-red' |
            'accent-orange',
        state?: 'active' | 'disabled' | '',
        disabled?: boolean,
        ghost?: boolean,
        displayDiv?: boolean,
        link?: string,
    }>();
</script>

<template>
    <NuxtLink :to="link" class="icon-button" v-if="link"
        :data-size="props.size || 'basic'"
        :data-color="props.color || 'accent'"
        :data-state="props.state"
        :disabled="props.disabled"
        :data-ghost="
            props.ghost || 
            props.color == 'neutral' ||
            props.color == 'accent-blue' ||
            props.color == 'accent-orange' ||
            props.color == 'accent-green' ||
            props.color == 'accent-red' ||
            props.color == 'transparent-secondary' ||
            props.color == 'inverse'"
    ><slot />
    </NuxtLink>
    <div class="icon-button" v-else-if="!link && displayDiv"
        :data-size="props.size || 'basic'"
        :data-color="props.color || 'accent'"
        :data-state="props.state"
        :disabled="props.disabled"
        :data-ghost="
            props.ghost || 
            props.color == 'neutral' ||
            props.color == 'accent-blue' ||
            props.color == 'accent-orange' ||
            props.color == 'accent-green' ||
            props.color == 'accent-red' ||
            props.color == 'transparent-secondary' ||
            props.color == 'inverse'"
    ><slot />
    </div>
    <button class="icon-button" v-else-if="!link && !displayDiv"
        :data-size="props.size || 'basic'"
        :data-color="props.color || 'accent'"
        :data-state="props.state"
        :disabled="props.disabled"
        :data-ghost="
            props.ghost || 
            props.color == 'neutral' ||
            props.color == 'accent-blue' ||
            props.color == 'accent-orange' ||
            props.color == 'accent-green' ||
            props.color == 'accent-red' ||
            props.color == 'transparent-secondary' ||
            props.color == 'inverse'"
    ><slot />
    </button>
</template>

<style lang="scss">
    .icon-button {
        cursor: pointer;
        @include df_ac_jcc;
        width: fit-content;
        height: fit-content;

        @include transition(background-color, opacity);

        svg {
            width: auto;
            @include transition(transform);
            path {
                @include transition(fill);
                fill-opacity: 1;
            }
        }

        &[data-size="large"] {
            padding: 1rem;
            border-radius: .5rem;
            @include mobile {
                padding: .75rem;
                border-radius: .375rem;
            }
            svg {
                max-height: 1.75rem;
                height: 100%;
                aspect-ratio: 1;
                @include mobile {
                    max-height: 1.5rem;
                }
            }
        }
        &[data-size="basic"] {
            padding: .5rem;
            border-radius: .5rem;
            @include mobile {
                border-radius: .375rem;
            }
            svg {
                max-height: 1.75rem;
                height: 100%;
                aspect-ratio: 1;
                @include mobile {
                    max-height: 1.5rem;
                }
            }
        }
        &[data-size="small"] {
            padding: .25rem;
            border-radius: .25rem;
            @include mobile {
                padding: .125rem;
            }
            svg {
                max-height: 1.5rem;
                height: 100%;
                aspect-ratio: 1;
                @include mobile {
                    max-height: 1.25rem;
                }
            }
        }
        &[data-size="micro"] {
            border-radius: .25rem;
            max-height: 1.25rem;
            aspect-ratio: 1;
            svg {
                @include wh-100;
                @include mobile {
                    max-height: 1.25rem;
                }
            }
        }

        &[data-color="accent"]{
            background-color: $bg-accent;
            svg path {
                fill: $icon-inverse;
            }
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
            }
        }
        &[data-color="transparent"]{
            background-color: $bg-accent-transparent-4;
            svg path {
                fill: $icon-accent;
            }
            &:hover {
                background-color: $bg-accent-transparent-8;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-accent;
                svg path {
                    fill: $icon-inverse;
                }
            }
            &:disabled,
            &[data-state="disabled"] {
                background-color: unset;
                svg path {
                    fill: $icon-inverse;
                }
            }
        }
        &[data-color="positive"]{
            background-color: $bg-system-positive;
            svg path {
                fill: $icon-inverse;
            }
            &:hover {
                background-color: $bg-inverse;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-inverse;
            }
            &:disabled,
            &[data-state="disabled"] {
                background-color: unset;
            }
        }
        &[data-color="negative"]{
            background-color: $bg-system-negative;
            svg path {
                fill: $icon-inverse;
            }
            &:hover {
                background-color: $bg-inverse;
            }
            &:active,
            &[data-state="active"] {
                background-color: $bg-inverse;
            }
            &:disabled,
            &[data-state="disabled"] {
                background-color: unset;
            }
        }

        &[data-ghost="true"] {
            background-color: unset;
            &:hover {
                background-color: unset;
            }
            &:active,
            &[data-state="active"] {
                background-color: unset;
            }

            &[data-color="neutral"] {
                svg path {
                    fill: $icon-primary;
                }
                &:hover {
                    svg path {
                        fill: $icon-accent;
                    }
                }
                &:active,
                &[data-state="active"] {
                    svg path {
                        fill: $icon-accent;
                    }
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
            }
            &[data-color="negative"] {
                svg path {
                    fill: $icon-primary-transparent-32;
                }
                &:hover {
                    svg path {
                        fill: $icon-primary-transparent-48;
                    }
                }
                &:active,
                &[data-state="active"] {
                    svg path {
                        fill: $icon-system-negative;
                    }
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
            }
            &[data-color="transparent"] {
                svg path {
                    fill: $icon-primary-transparent-48;
                }
                &:hover {
                    svg path {
                        fill: $icon-primary;
                    }
                }
                &:active,
                &[data-state="active"] {
                    svg path {
                        fill: $icon-primary;
                    }
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
            }
            &[data-color="transparent-secondary"] {
                svg path {
                    fill: $icon-primary-transparent-32;
                }
                &:hover {
                    svg path {
                        fill: $icon-primary-transparent-48;
                    }
                }
                &:active,
                &[data-state="active"] {
                    svg path {
                        fill: $icon-primary;
                    }
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
            }
            &[data-color="positive"] {
                svg path {
                    fill: $icon-primary-transparent-32;
                }
                &:hover {
                    svg path {
                        fill: $icon-primary-transparent-48;
                    }
                }
                &:active,
                &[data-state="active"] {
                    svg path {
                        fill: $icon-system-positive;
                    }
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
            }
            &[data-color="inverse"] {
                svg path {
                    fill: $icon-inverse-transparent-48
                }
                &:hover {
                    svg path {
                        fill: $icon-inverse;
                    }
                }
                &:active,
                &[data-state="active"] {
                    svg path {
                        fill: $icon-inverse;
                    }
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-inverse-transparent-16;
                    }
                }
            }

            &[data-color="accent-blue"] {
                svg path {
                    fill: $icon-accent;
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
                &:active,
                &[data-state="active"] {
                    background-color: $bg-primary;
                }
            }
            &[data-color="accent-orange"] {
                svg path {
                    fill: $icon-subaccent;
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
                &:active,
                &[data-state="active"] {
                    background-color: $bg-primary;
                }
            }
            &[data-color="accent-green"] {
                svg path {
                    fill: $icon-system-positive;
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
                &:active,
                &[data-state="active"] {
                    background-color: $bg-primary;
                }
            }
            &[data-color="accent-red"] {
                svg path {
                    fill: $icon-system-negative;
                }
                &:disabled,
                &[data-state="disabled"] {
                    svg path {
                        fill: $icon-primary-transparent-16;
                    }
                }
                &:active,
                &[data-state="active"] {
                    background-color: $bg-primary;
                }
            }
        }
        &:disabled,
        &[data-state="disabled"] {
            pointer-events: none;
        }
    }
</style>