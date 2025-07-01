<script lang="ts" setup>

    const props = defineProps<{
        onClick?: boolean,
        menuSide?: 'left' | 'right',
        onOpen?: ()=>void
    }>();

    const dropdownOpened = ref('');

    const dropdownRef = ref<HTMLDivElement | null>(null);

    const openDropdown=()=>{
        dropdownOpened.value = 'active';
        if(props.onOpen) props.onOpen();
    };
    const closeDropdown=()=>{
        dropdownOpened.value = '';
        document.removeEventListener('click', checkForClose);
    };

    const openDropdownClick=()=>{
        openDropdown();
        document.addEventListener('click', checkForClose);
    };
    const checkForClose=(event: Event)=>{
        const target = event.target as HTMLDivElement;
        if(dropdownRef.value && !dropdownRef.value.contains(target)) {
            closeDropdown();
        };
    };

    let mobileVersion = ref(false);
    onNuxtReady(()=>{
        mobileVersion.value = window.innerWidth < 769;
    })
</script>

<template>
    <div class="dropdown" 
        v-if="onClick || mobileVersion"
        ref="dropdownRef"
        :data-state="dropdownOpened" 
    >
        <div class="dropdown__header" @click="openDropdownClick">
            <slot name="header"/>
        </div>
        <Transition name="dropdown">
            <!-- <div :class="`dropdown__menu ${menuSide ? menuSide : 'right'}`" v-if="dropdownOpened === 'active'"> -->
            <div :class="`dropdown__menu ${menuSide ? menuSide : 'right'}`" v-show="dropdownOpened === 'active'">
                <div class="dropdown__menu__container custom-scrollbar">
                    <slot/>
                </div>
            </div>
        </Transition>
    </div>
    <div class="dropdown hover" 
        v-else
        ref="dropdownRef"
        :data-state="dropdownOpened"
        @mouseenter="openDropdown" 
        @mouseleave="closeDropdown"
    >
        <div class="dropdown__header">
            <slot name="header"/>
        </div>
        <Transition name="dropdown">
            <!-- <div :class="`dropdown__menu ${menuSide ? menuSide : 'right'}`" v-if="dropdownOpened === 'active'"> -->
            <div :class="`dropdown__menu ${menuSide ? menuSide : 'right'}`" v-show="dropdownOpened === 'active'">
                <div class="dropdown__menu__container custom-scrollbar">
                    <slot/>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
    .dropdown {
        @include df_ac;
        z-index: 10;
        position: relative;
        width: fit-content;
        cursor: pointer;
        &__header {
            width: 100%;
            &:has(:disabled) {
                pointer-events: none;
            }
        }
        &__menu {
            z-index: 10;
            position: absolute;
            padding-top: .5rem;
            top: 1.5rem;
            min-width: 100%;
            &.left {
                right: 0;
            }
            &.right {
                left: 0;
            }
            &__container {
                @include df_fdc;
                overflow-y: auto;
                background-color: $bg-primary;
                border-radius: .5rem;
                box-shadow: 0 0 1rem 0 #2D303314;
                hr {
                    border: none;
                    border-top: 1px solid $border-primary-transparent-4;
                }
            }
        }
        &__option {
            text-wrap: nowrap;
            &:last-of-type {
                hr {
                    display: none;
                }
            }
        }
        &.hover {
            &:hover {
                z-index: 11;
                .link__chevron svg{
                    transform: rotate(180deg);
                }
            }
        }
        &[data-state="active"] {
            z-index: 11;
            .link__chevron svg{
                transform: rotate(180deg);
            }
        }
    }
</style>