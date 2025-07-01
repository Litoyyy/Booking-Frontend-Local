<script setup lang="ts">
    const props = defineProps<{
        color?: 'positive' | 'negative' | 'subdued' | 'inverse',
        drawLine?: boolean,
        title?: string,
        description?: string,
        type?: 'copy' | 'dialog',
        visible?: boolean,
    }>();

    const emit = defineEmits<{
        (event: "update:visible", value: boolean): void;
    }>();

    const closeDialog = () => {
        emit('update:visible', false);
    };

    watch(
        ()=>props.visible,
        (newValue)=>{
            if(newValue) setTimeout(() => {
                closeDialog();
            }, 5000);
        } 
    );

</script>

<template>
    <Transition name="dialog">
        <div class="dialog" v-if="!props.type && props.visible || props.type == 'dialog' && props.visible"
            :draw-line="props.drawLine || false" 
            :color="props.color || 'inverse'">
            <div class="dialog__title-block">
                <span>{{ props.title }}</span>
                {{ props.description }}
            </div>
            <ElementIconButton 
                size="small" 
                :ghost="true" 
                color="inverse"
                @click="closeDialog">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="white" fill-opacity="0.48"/>
                </svg>
            </ElementIconButton>
            <div class="dialog__line" v-if="drawLine"></div>
        </div>
        <div class="dialog dialog_copy" v-else-if="type === 'copy' && props.visible">
            Скопировано
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
    .dialog {
        z-index: 50;
        position: fixed;
        bottom: 1.5rem;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        align-items: flex-start;
        padding: .75rem 1rem 1.5rem 1rem;
        border-radius: .5rem;
        
        max-width: 25rem;
        width: 100%;
        grid-column: span 4;
        &_copy {
            @include text_2;
            color: $text-inverse;
        }
        &__title-block {
            @include df_fdc;
            gap: .25rem;
            width: 100%;
            @include text_2;
            color: $text-inverse;
            span {
                @include strong_1;
            }
        }
        &__line {
            position: absolute;
            height: .25rem;
            background-color: $bg-primary;
            transform: translate(0, -50%);
            bottom: .5rem;
            left: .5rem;
            border-radius: 6.25rem;
            animation-name: drawLine;
            animation-timing-function: linear;
            animation-duration: 5s;
        }
        &[color="positive"] {
            background-color: $bg-system-positive;
        }
        &[color="negative"] {
            background-color: $bg-system-negative;
        }
        &[color="subdued"] {
            background-color: $bg-inverse-subdued-16;
            .dialog__title-block {
                color: $text-primary;
            }
        }
        &[color="inverse"] {
            background-color: $bg-inverse;
            .dialog__line {
                background-color: $bg-subaccent;
            }
        }
        &[draw-line="false"] {
            padding: .75rem 1rem;
        }
    }

    .dialog-enter-active,
    .dialog-leave-active {
        @include transition(opacity, transform);
    }

    .dialog-enter-from,
    .dialog-leave-to {
        opacity: 0;
        transform: translate(-50%, 100%);
    }
    
    @keyframes drawLine {
        0% {
            width: 0;
        }
        100% {
            width: calc(100% - 1rem);
        }
    }
</style>