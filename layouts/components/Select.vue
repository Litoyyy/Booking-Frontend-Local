<script lang="ts" setup>
    const props = defineProps<{
        id?: string,
        size?: 'large' | 'basic',
        theme?: 'light' | 'dark',
        name?: string,
        fakePlaceholder?: string,
        placeholder?: string,
        emptyOption?: string,
        dataAttr?: string,
        disabled?: boolean,
        popover?: string,
        helper?: string,
        readonly?: boolean,
        minValue?: number,
        newValue?: string,
        onChoose?: () => void,
        onInput?: (event: Event)=> void,
        onBlur?: (event: Event)=> void,
        onOpen?: ()=> void
    }>();

    const selectRef = ref<HTMLDivElement | null>(null);

    const selectedObject = ref({});

    const menuOpened = ref(false);

    watch(
        () => props.newValue,
        (newValue) => {
            selectedObject.value.name = newValue || '';
        },
        { immediate: true }
    );

    const openSelect = () => {
        menuOpened.value = true;
        setTimeout(() => {
            if(props.onOpen) props.onOpen();
            document.addEventListener('click', checkForClose);
        }, 300);
    };
    function checkForClose(event: Event) {
        const targetElem = (event.target as any);
        if(!!selectRef.value && !selectRef.value.contains(targetElem)) {
            closeSelect();
        };
    };
    const closeSelect = () => {
        menuOpened.value = false;
        document.removeEventListener('click', checkForClose);
        if(props.onChoose && typeof(props.onChoose) === 'function') props.onChoose();
    };
    
    defineExpose({
        closeSelect
    });

</script>

<template>
    <div class="select"
        :data-size="size"
        :disabled="disabled"
        ref="selectRef"
    >
        <ElementInput
            class="select-input"
            :id="id"
            :size="size"
            :theme="theme"
            :name="name"
            :fake-placeholder="fakePlaceholder"
            :placeholder="placeholder"
            :new-value="selectedObject.name"
            :popover="popover"
            :on-focus="openSelect"
            :on-input="onInput"
            :on-blur="onBlur"
            :data-attr="dataAttr"
            :helper="helper"
            :select-opened="menuOpened"
            :readonly="readonly"
            :disabled="disabled"
            icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" fill="#2D3033" fill-opacity="0.48"/>
                </svg>'
        >
        <template #replace_input v-if="$slots.replace_input">
            <slot name="replace_input"/>
        </template>
        </ElementInput>
        <Transition name="select-menu">
            <div class="select__menu" v-if="menuOpened">
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
    .select {
        position: relative;
        @include df_fdc;
        &__menu {
            z-index: 15;
            position: absolute;
            top: 4.25rem;
            min-width: 100%;
            max-height: 10rem;
            overflow-y: auto;
            @include df_fdc;
            background-color: $bg-primary;
            &:has(.option) {
                border-radius: .5rem;    
            }
            &__item {
                hr {
                    border: 0;
                    border-top: 1px solid $border-primary-transparent-8;
                }
                &:last-of-type {
                    hr {
                        display: none;
                    }
                }
            }
        }
        &[disabled="true"] {
            pointer-events: none;
        }
        &[data-size="basic"] {
            .select__menu {
                top: 3.25rem;
            }
        }
    }
    .select-menu-enter-active,
    .select-menu-leave-active {
        @include transition(opacity, transform);
    }

    .select-menu-enter-from,
    .select-menu-leave-to {
        opacity: 0;
        transform: translateY(-2rem);
    }
</style>