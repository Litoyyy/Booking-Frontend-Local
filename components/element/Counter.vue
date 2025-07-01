<script setup lang="ts">
    const props = defineProps<{
        id?: string,
        fakePlaceholder?: string,
        placeholder?: string,
        updatedValue?: number,
        minValue?: number,
        onUpdate?: (value: any)=>void,
    }>()

    const newValue = ref(props.updatedValue ?? 0);

    const minimunValue = props.minValue ? props.minValue : 0;

    const formattedValue = ref(props.updatedValue ? newValue.value.toString(): '');

    const decreaseValue=()=>{
        if(newValue.value <= minimunValue) return;
        newValue.value += -1;
    };
    const increaseValue=()=>{
        newValue.value += 1;
    };
    const onInputFunc=(event: Event)=>{
        const target = event.target as HTMLInputElement;
        newValue.value = !!target.value ? Number(target.value) : 0;
    };

    const debouncedOnInput = debounce(onInputFunc, 300);

    watch(
        ()=>newValue.value,
        ()=>{
            formattedValue.value = newValue.value.toString();
            if(props.onUpdate && typeof(props.onUpdate) === 'function') {
                props.onUpdate(formattedValue.value);
            };
        }, { immediate: true }
    );
    watch(
        ()=>props.updatedValue,
        (udpVal)=>{
            if(!props.updatedValue) return;
            newValue.value = props.updatedValue;
        }, { immediate: true}
    );
</script>

<template>
    <ElementInput
        :id=id
        :fake-placeholder="fakePlaceholder"
        :placeholder="placeholder"
        :new-value="formattedValue"
        :mask="Number"
        :on-input="(event: Event)=>debouncedOnInput(event)"
        class="counter-input"
    ><div class="counter-block">
        <button class="counter-block__button" @click="increaseValue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
        </button>
        <button class="counter-block__button" @click="decreaseValue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
        </button>
    </div>
    </ElementInput>
</template>

<style lang="scss">
    .field {
        &.counter-input {
            .input-label {
                padding: .5rem 1rem;
                &__icon-block {
                    padding-top: 0;
                    padding-bottom: .25rem;
                    @include mobile {
                        padding-top: 0;
                        padding-bottom: .125rem;
                    }
                }
            }
        }
    }
    .counter-block {
        @include df_fdc;
        &__button {
            height: 1.5rem;
            aspect-ratio: 1;
            cursor: pointer;
            svg {
                @include wh_100;
                path {
                    @include transition(fill-opacity);
                }
            }
            &:last-of-type {
                margin-top: -.125rem;
            }
            &:first-of-type {
                margin-bottom: -.125rem;
            }
            &:hover {
                path {
                    fill-opacity: .64;
                }
            }
            &:active {
                path {
                    fill-opacity: 1;
                }
            }
        }
    }
</style>