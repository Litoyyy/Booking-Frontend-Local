<script lang="ts" setup>
    const slots = useSlots();
    const hasHeaderDescription = !!slots.header_description;
    const hasSubHeaderDescription = !!slots.subheader_description;

    
    const props = defineProps<{
        name: string,
        description?: string,
        resize?: boolean,
        headerType?: 'header' | 'subheader',
        chevron?: boolean,
        fadeBottom?: boolean,
        position?: 'center' | 'end',
        onOpened?: ()=>void,
        
        visible?: boolean
    }>();

    const emit = defineEmits<{
        (event: "update:visible", value: boolean): void;
    }>();

    const closePopup = () => {
        emit("update:visible", false);
    };
    const fullWindowSize = ref(false);

    watch(
        ()=>props.visible,
        (newValue)=>{
            if(newValue && props.onOpened) {
                setTimeout(() => {
                    props.onOpened();
                }, 100);
            }
        }
    );

</script>

<template>
    <div class="popup" :visible="visible" :position="position || 'center'">
        <div class="popup__inset" @click="closePopup" v-if="visible"></div>
        <Transition name="popup">
            <div class="popup__content" v-if="visible" :fade-bottom="fadeBottom">
                <div class="popup__header" v-if="!headerType || headerType === 'header'">
                    <div class="popup__header__title-block">
                        <div class="popup__header__name">
                            {{ props.name }}
                        </div>
                        <div class="popup__header__button-block">
                            <ElementIconButton v-if="props.resize"
                                color="transparent" 
                                :ghost="true"
                                @click="()=>{
                                    fullWindowSize = !fullWindowSize;
                                    console.log(fullWindowSize);
                                }"    
                            >
                                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.1836 8.66732H14.0002V6.33398H22.1668V14.5007H19.8335V10.3172L9.81674 20.334H14.0002V22.6673H5.8335V14.5007H8.16683V18.6841L18.1836 8.66732Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                            </ElementIconButton>
                            <ElementIconButton color="transparent" 
                            :ghost="true"
                            @click="closePopup">
                                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.9998 12.8509L19.7746 7.07617L21.4245 8.72608L15.6497 14.5008L21.4245 20.2755L19.7746 21.9254L13.9998 16.1507L8.22512 21.9254L6.5752 20.2755L12.3499 14.5008L6.5752 8.72608L8.22512 7.07617L13.9998 12.8509Z" fill="#2D3033" fill-opacity="0.48"/>
                                </svg>
                            </ElementIconButton>
                        </div>
                    </div>
                    <div class="popup__header__description" v-if="props.description || hasHeaderDescription">
                        {{ props.description }}
                        <slot name="header_description"></slot>
                    </div>
                </div>
                <div class="popup__subheader" v-else-if="headerType === 'subheader'">
                    <div class="popup__subheader__title-block">
                        <div class="popup__subheader__name">
                            <Transition name="width">
                                <ElementIconButton ghost color="transparent" v-if="chevron">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6328 14.0008L18.4076 19.7755L16.7577 21.4254L9.33301 14.0008L16.7577 6.57617L18.4076 8.22608L12.6328 14.0008Z" fill="#2D3033" fill-opacity="0.48"/>
                                    </svg>
                                </ElementIconButton>
                            </Transition>
                            {{ props.name }}
                        </div>
                        <ElementIconButton color="transparent" 
                        :ghost="true"
                        @click="closePopup">
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9998 12.8509L19.7746 7.07617L21.4245 8.72608L15.6497 14.5008L21.4245 20.2755L19.7746 21.9254L13.9998 16.1507L8.22512 21.9254L6.5752 20.2755L12.3499 14.5008L6.5752 8.72608L8.22512 7.07617L13.9998 12.8509Z" fill="#2D3033" fill-opacity="0.48"/>
                            </svg>
                        </ElementIconButton>
                    </div>
                    <div class="popup__subheader__description" v-if="hasSubHeaderDescription">
                        <slot name="subheader_description"></slot>
                    </div>
                </div>
        
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        inset: 0;
        padding: 1rem;
        pointer-events: none;
        &[visible="true"] {
            pointer-events: unset;
        }
        &[position="center"] {
            @include df_ac_jcc;
        }
        &[position="end"] {
            display: flex;
            align-items: start;
            justify-content: flex-end;
        }
        &__inset {
            // z-index: 98;
            position: absolute;
            inset: 0;
            background-color: $bg-inverse-transparent-32;
        }
        &__content {
            position: relative;
            @include df_fdc;
            gap: 2rem;
            background-color: $bg-primary;
            padding: 3rem;
            border-radius: .5rem;
            &:has(.popup__info-block.custom-scrollbar) {
            padding: 0;
            padding-bottom: 4rem;
            gap: 3rem;
            .popup__header,
            .popup__subheader {
                padding: 3rem 3rem 0;
            }
            &::v-deep(.popup__info-block) {
                padding: 0 2rem 0 3rem;
                margin-right: .5rem;
                overflow-y: auto;
            }
        }
        &[fade-bottom="true"] {
            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 4rem;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
                pointer-events: none;
            }
        }
        }
        &__header {
            @include df_fdc;
            gap: .5rem;
            &__name {
                @include heading_1;
            }
            &__title-block {
                @include df_jb_ac;
            }
            &__button-block {
                @include df_ac;
            }
            &__description {
                @include text_1;
            }
        }
        &__subheader {
            @include df_fdc;
            gap: 1.5rem;
            &__description {
                @include df_fdc;
                gap: 1.5rem;
            }
            &__title-block {
                @include df_jb_ac;
            }
            &__name {
                @include df_ac;
                gap: .5rem;
                @include heading_2;
            }
        }
    }

    .popup-enter-active, .popup-leave-active {
        @include transition(opacity, scale)
    }
    .popup-enter-from, .popup-leave-to {
        opacity: 0;
        scale: 0;
    }
    .popup-enter-to, .popup-leave-from {
        opacity: 1;
        scale: 1;
    }
</style>