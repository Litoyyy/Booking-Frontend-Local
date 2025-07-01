<script setup lang="ts">
    const props = defineProps<{
        size?: 'basic' | 'small',
        color?: 'neutral' | 'transparent' | 'accent' | 'subaccent' | 'negative',
        link?: string,
        state?: 'active' | 'disabled' | '',
        chevron?: 'left' | 'right',
        theme?: 'dark' | 'light',
        disabled?: boolean,
    }>();
</script>

<template>
    <NuxtLink v-if="!!link" class="link"
        :to="link"
        :data-size="size || 'basic'"
        :data-color="color || 'neutral'"
        :data-state="state"
        :data-theme="theme || 'light'"
        :disabled="disabled"
    >
    <span class="link__icon" v-if="$slots.icon">
        <slot name="icon"/>
    </span>
    <slot />
    </NuxtLink>
    <button v-else class="link"
        :data-size="size || 'basic'"
        :data-color="color || 'neutral'"
        :data-state="state"
        :data-theme="theme || 'light'"
        :disabled="disabled"
    >
    <span class="link__icon" v-if="$slots.icon">
        <slot name="icon"/>
    </span>
    <span class="link__chevron" v-if="chevron=='left'">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99993 8.78092L11.2998 5.48111L12.2426 6.42392L7.99993 10.6666L3.75732 6.42392L4.70013 5.48111L7.99993 8.78092Z" fill="#2D3033"/>
        </svg>
    </span>
    <slot />
    <span class="link__chevron" v-if="chevron=='right'">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99993 8.78092L11.2998 5.48111L12.2426 6.42392L7.99993 10.6666L3.75732 6.42392L4.70013 5.48111L7.99993 8.78092Z" fill="#2D3033"/>
        </svg>
    </span>
    </button>
</template>

<style lang="scss">
    a {
        cursor: pointer;
        text-decoration: none;
        color: $text-primary;
    }
    .link {
        @include df_ac;
        gap: .25rem;
        cursor: pointer;
        @include transition(color, background-color);
        
        svg {
            @include transition(transform);
            path {
                @include transition(fill);
            }
        }

        &__icon {
            display: flex;
            height: 1.5rem;
            aspect-ratio: 1;
            margin-right: .75rem;
            svg {
                @include wh_100;
            }
        }

        &__chevron {
            display: flex;
            height: 1rem;
            aspect-ratio: 1;
            svg {
                @include wh_100;
            }
        }

        &[data-size="basic"] {
            @include text_1;
        }
        &[data-size="small"] {
            @include text_2;
        }

        &[data-color="neutral"] {
            color: $text-primary;
            .link__chevron svg path {
                fill: $icon-primary;
            }
            &:hover {
                color: $text-primary-transparent-48;
                .link__chevron svg path {
                    fill: $icon-primary-transparent-48;
                }
            }
            &:active,
            &[data-state="active"] {
                color: $text-accent;
                &:has(.link__chevron) {
                    color: $text-primary-transparent-48;
                    .link__chevron svg path {
                        fill: $icon-primary-transparent-48;
                    }
                }
            }
            &:disabled,
            &[data-state="disabled"] {
                color: $text-primary-transparent-16;
            }
            &[data-theme="dark"] {
                color: $text-inverse;
                .link__chevron svg path {
                    fill: $icon-inverse;
                }
                &:hover {
                    color: $text-inverse-transparent-48;
                    .link__chevron svg path {
                        fill: $icon-inverse-transparent-48;
                    }
                }
                &:active,
                &[data-state="active"] {
                    color: $text-subaccent;
                    &:has(.link__chevron) {
                        color: $text-inverse;
                    }
                    .link__chevron svg path {
                        fill: $icon-inverse;
                    }
                }
                &:disabled,
                &[data-state="disabled"] {
                    color: $text-inverse-transparent-16;
                    .link__chevron svg path {
                        fill: $icon-inverse-transparent-16;
                    }
                }
            }
        }
        &[data-color="transparent"] {
            color: $text-primary-transparent-48;
            .link__chevron svg path {
                fill: $icon-primary-transparent-48;
            }
            &:hover {
                color: $text-primary;
                .link__chevron svg path {
                    fill: $icon-primary;
                }
            }
            &:active,
            &[data-state="active"] {
                color: $text-primary;
                &:has(.link__chevron) {
                    color: $text-primary-transparent-48;
                    .link__chevron svg path {
                        fill: $icon-primary-transparent-48;
                    }
                }
            }
            &:disabled,
            &[data-state="disabled"] {
                color: $text-primary-transparent-16;
            }
        }
        &[data-color="accent"] {
            color: $text-accent;
            &:hover {
                color: $text-primary;
            }
            &:active,
            &[data-state="active"] {
                color: $text-primary;
            }
            &:disabled,
            &[data-state="disabled"] {
                color: $text-primary-transparent-16;
            }
        }
        &[data-color="subaccent"] {
            color: $text-subaccent;
            &:hover {
                color: $text-primary;
            }
            &:active,
            &[data-state="active"] {
                color: $text-subaccent;
            }
            &:disabled,
            &[data-state="disabled"] {
                color: $text-primary-transparent-16;
            }
            &[data-theme="dark"] {
                color: $text-subaccent;
                &:hover {
                    color: $text-inverse;
                }
                &:active, 
                &[data-state="active"] {
                    color: $text-subaccent;
                }
            }
        }
        &[data-color="negative"] {
            color: $text-system-negative;
            &:hover {
                color: $text-primary;
            }
            &:active,
            &[data-state="active"] {
                color: $text-system-negative;
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
        &:active,
        &[data-state="active"] {
            .link__chevron svg {
                transform: rotate(180deg);
            }
        }
    }
</style>