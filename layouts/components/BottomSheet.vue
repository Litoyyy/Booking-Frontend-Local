<script lang="ts" setup>
    const props = defineProps<{
        active?: boolean,
        inset?: boolean,
        theme?: 'light' | 'dark',
    }>();

    const emit = defineEmits<{
        (event: "update:active", value: boolean): void;
    }>();

    const bottomSheetRef = ref<HTMLDivElement | null>(null);
    const startY = ref(0);
    const moveY = ref(0);
    const currentY = ref(0);
    const isDragging = ref(false);
    const bottomSheetHeight = ref(0);

    onMounted(() => {
        if (bottomSheetRef.value) {
            bottomSheetHeight.value = bottomSheetRef.value.offsetHeight;
        }
    });

    const closeSheet = () => {
        emit("update:active", false);
    };

    const hideBottomSheet = () => {
        if (bottomSheetRef.value) {
            bottomSheetRef.value.style.transform = "";
        }
        emit("update:active", false);
    };

    const onTouchStart = (event: TouchEvent) => {
        startY.value = event.touches[0].clientY;
        isDragging.value = true;
        currentY.value = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
        if (!isDragging.value) return;

        moveY.value = event.touches[0].clientY;
        const deltaY = moveY.value - startY.value;
        currentY.value = deltaY;

        if (bottomSheetRef.value && currentY.value > 0) {
            bottomSheetRef.value.style.transform = `translateY(${currentY.value}px)`;
        }
    };

    const onTouchEnd = () => {
        isDragging.value = false;
        if (!bottomSheetRef.value) return;

        if (currentY.value > bottomSheetHeight.value / 2) {
            hideBottomSheet();
        } else {
            bottomSheetRef.value.style.transition = "transform 0.3s ease";
            bottomSheetRef.value.style.transform = "translateY(0px)";
        }
    };
</script>

<template>
    <Transition name="bottom-sheet">
        <div class="bottom-sheet" v-if="active" :data-theme="theme || 'light'">
            <div :class="inset ? 'bottom-sheet__inset visible': 'bottom-sheet__inset'"
            @click="closeSheet"></div>
            <div class="bottom-sheet__dialog" ref="bottomSheetRef">
                <div class="bottom-sheet__indicator-block"
                    @touchstart="onTouchStart"
                    @touchmove="onTouchMove"
                    @touchend="onTouchEnd"
                >
                    <div class="bottom-sheet__indicator-block__indicator"></div>
                </div>

                <slot/>

            </div>
        </div>
    </Transition>
</template>

<style lang="scss">
    body {
        &:has(.bottom-sheet) {
            overflow: hidden;
        }
    }
    .bottom-sheet {
        position: fixed;
        top: 0;
        left: 0;
        inset: 0;
        z-index: 50;
        display: flex;
        align-items: flex-end;
        &__inset {
            position: absolute;
            inset: 0;
            &.visible {
                background-color: $bg-inverse-transparent-32;
            }
        }
        &__dialog {
            z-index: 1;
            width: 100%;
            border-radius: .75rem .75rem 0 0;
        }
        &__indicator-block {
            @include df_ac_jcc;
            height: .75rem;
            &__indicator {
                content: '';
                width: 2.25rem;
                height: .25rem;
                border-radius: 1000px;
            }
        }
        &[data-theme="light"] {
            .bottom-sheet {
                &__dialog {
                    background-color: $bg-primary;
                }
                &__indicator-block {
                    &__indicator {
                        background-color: $bg-inverse-subdued-8;
                    }
                }
            }
        }
        &[data-theme="dark"] {
            .bottom-sheet {
                &__dialog {
                    background-color: $bg-inverse;
                }
                &__indicator-block {
                    &__indicator {
                        background-color: $bg-primary-transparent-16;
                    }
                }
            }
        }
    }
    .bottom-sheet-enter-active,
    .bottom-sheet-leave-active {
        @include transition(opacity);
    }
    .bottom-sheet-enter-from,
    .bottom-sheet-leave-to {
        opacity: 0;
    }
</style>