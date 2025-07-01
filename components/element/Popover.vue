<script setup lang="ts">
    const props = defineProps<{
        title?: string,
        size?: 'basic' | 'small',
        color?: 'light' | 'dark',
        position?: 'left' | 'center' | 'right',
    }>();
    const { currentlyMobile } = mobileState();

    const isShowBottomSheet = ref(false);
</script>

<template>
    <div class="popover"
        :data-size="props.size || 'small'"
        :data-color="props.color || 'light'"
        :data-position="props.position || 'left'"
        @click="()=>{
            if(currentlyMobile) {
                isShowBottomSheet = !isShowBottomSheet;
            }
        }"
    >   
        <slot name="icon"/>
        <div class="popover__icon" v-if="!$slots.icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8Z" class="background"/>
                <path d="M12 8C12.5523 8 13 7.55229 13 7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7C11 7.55229 11.4477 8 12 8ZM10 10.6667H11.3333V16H10V17.3333H14V16H12.6667V9.33333H10V10.6667Z" class="icon"/>
            </svg>
        </div>
        <div class="popover__text-block" v-if="!currentlyMobile">
            <slot />
        </div>
    </div>
    <BottomSheetPopover v-if="currentlyMobile"
        v-model:active="isShowBottomSheet"
        :title="title"
    ><slot />
    </BottomSheetPopover>
</template>

<style lang="scss">
    .popover {
        @include df_ac;
        gap: .5rem;
        position: relative;
        cursor: default;
        
        svg {
            @include wh_100;
            path {
                @include transition(fill, fill-opacity);
            }
        }
        &__icon {
            display: flex;
            width: 1.5rem;
            height: 1.5rem;
        }
        &__text-block {
            z-index: 15;
            pointer-events: none;
            position: absolute;
            display: flex;
            border-radius: .5rem;
            opacity: 0;
            @include transition(opacity);
        }

        &[data-size=basic] {
            .popover__text-block {
                top: 2.75rem;
                padding: .5rem .75rem;
                @include text_1;
            }
        }
        &[data-size=small] {
            .popover__text-block {
                top: 2rem;
                padding: .25rem .5rem;
                @include text_2;
            }
        }

        &[data-color=light] {
            svg {
                .background {
                    fill: $bg-inverse-transparent-8;
                }
                .icon {
                    fill: $icon-primary-transparent-32;
                }
            } 
            .popover__text-block {
                background-color: $bg-inverse;
                color: $text-inverse;
            }
            &:hover {
                svg {
                    .icon {
                        fill: $icon-primary;
                    }
                    path {
                        fill: $icon-primary-transparent-48;
                    }
                }
            }
        }
        &[data-color=dark] {
            svg {
                .background {
                    fill: $bg-primary-transparent-8;
                }
                .icon {
                    fill: $icon-inverse-transparent-32;
                }
            }
            .popover__text-block {
                background-color: $bg-primary;
                color: $text-primary;
            }
            &:hover {
                svg {
                    .icon {
                        fill: $icon-inverse;
                    }
                }
            }
        }

        &[data-position=left] {
            .popover__text-block {
                left: -.25rem;
            }
        }
        &[data-position=center] {
            .popover__text-block {
                left: 50%;
                transform: translateX(-50%);
            }
        }
        &[data-position=right] {
            .popover__text-block {
                right: -.25rem;
            }
        }

        &:hover {
            .popover__text-block {
                pointer-events: all;
                opacity: 1;
            }
        }
    }
</style>