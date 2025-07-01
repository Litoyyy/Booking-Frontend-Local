<script setup lang="ts">
    import IMask from 'imask'

    const props = defineProps<{
        id?: string,
        name?: string,
        type?: 'text' | 'textarea' | 'password' | 'email',
        size?: 'large' | 'basic' | 'micro',
        theme?: 'light' | 'dark',
        state?: 'default' | 'error' | 'disabled' | 'select-opened',
        dataAttr?: string,
        newValue?: string,
        placeholder?: string,
        fakePlaceholder?: string,
        helper?: string,
        helperLink?: string,
        popover?: string,
        inputLabelText?: string,
        selectOpened?: boolean,
        maxLength?: Number,
        icon?: HTMLOrSVGElement,
        clearBtn?: boolean,
        onFocus?: (event: FocusEvent) => void,
        onBlur?: (event: FocusEvent) => void,
        onClear?: Function,
        onInput?: Function,
        readonly?: boolean,
        deleteBtn?: boolean,
        mask?: string | number,
    }>();

    const emit = defineEmits(['update:newValue', 'update:deleteBtn']);

    const inputRef = ref<HTMLDivElement | null>(null);
    onMounted(() => {
        if (props.mask && inputRef.value) {
            IMask(inputRef.value as HTMLInputElement,  { mask: props.mask });
        };
        if (inputRef.value && props.name == 'phone') {
            IMask(inputRef.value as HTMLInputElement, { mask: '+{7} 000 000-00-00' });
        };
    });
    

    let placeholderState = ref('');
    let localValue = ref('');
    let localDataAttr = ref('');
    let deleteBtnState = ref(false);

    const visiblePassword = ref(false);

    watch(
        () => props.newValue,
        (newValue) => {
            if (!!newValue) {
                placeholderState.value = 'active';
            } else {
                placeholderState.value = '';
            }
            localValue.value = newValue || '';
        },
        { immediate: true }
    );

    watch(
        () => props.dataAttr,
        (newValue) => {
            localDataAttr.value = newValue || '';
        },
        { immediate: true }
    );
    watch(localValue, (newValue) => {
        if(!props.clearBtn) return;
        deleteBtnState.value = newValue !== '';
        emit('update:deleteBtn', deleteBtnState.value);
    });

    const inputFunc = (event: Event) =>{
        const input = (event.target as HTMLInputElement);
        localValue.value = input.value;
        input.value == '' ? placeholderState.value = '': placeholderState.value = 'active';

        if(props.onInput) props.onInput(event);
    };
    const clearValue = () =>{
        localValue.value = '';
        placeholderState.value = '';
        deleteBtnState.value = false;

        if(props.onClear) props.onClear();
    };

    const togglePassword = () => {
        if (!inputRef.value) return;

        if (inputRef.value.type === 'password') {
            inputRef.value.type = 'text';
            visiblePassword.value = true;
        } else {
            inputRef.value.type = 'password';
            visiblePassword.value = false;
        };

        // inputRef.value.type = inputRef.value.type === 'password' 
        // ? 'text' 
        // : 'password';
        
    }
</script>

<template>
    <div 
        class="field"
        :data-theme="theme || 'light'"
        :data-state="state"
    >
        <label v-if="type !== 'textarea'"
            :for="id || 'input-elem'"
            class="input-label"
            :data-size="size || 'large'"
            >
            <input :type="type || 'text'"
                :class="$slots.replace_input ? 'hidden': ''"
                ref="inputRef"
                :id="id || 'input-elem'"
                :placeholder="placeholder"
                @input="inputFunc"
                @focus="onFocus"
                @blur="onBlur"
                :value="localValue"
                :readOnly="readonly"
                :name="name"
                :maxlength="maxLength"
                :data-value="localDataAttr"
            >
            <slot name="replace_input"/>
            <div class="input-label__fake-placeholder" v-if="fakePlaceholder && size !== 'basic'"
                :data-state="placeholderState"
            >{{ fakePlaceholder }}
            </div>

            <div class="input-label__icon-block" v-if="$slots.default || !!icon || !!popover || !!inputLabelText">
                <slot/>
                <Transition name="delete-btn">
                    <div class="input-label__icon" v-if="deleteBtnState"
                        @click="clearValue"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="#2D3033" fill-opacity="0.48"/>
                        </svg>
                    </div>
                </Transition>
                <ElementPopover v-if="popover"
                    :color="theme"
                >{{ popover }}
                </ElementPopover>
                <div class="input-label__icon" v-if="icon" v-html="icon"
                    :data-select-opened="selectOpened"
                ></div>
                <div class="input-label__text" v-if="inputLabelText">
                    {{ inputLabelText }}
                </div>
            </div>


            <div class="input-label__icon-block"
                v-if="props.type == 'password'"
                @click="togglePassword">
                <div class="input-label__icon">
                    <svg v-if="visiblePassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62283 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87993 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23874 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                    <svg v-else
                        xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M1.18164 12.5C2.12215 7.37976 6.60812 3.5 12.0003 3.5C17.3924 3.5 21.8784 7.37976 22.8189 12.5C21.8784 17.6202 17.3924 21.5 12.0003 21.5C6.60812 21.5 2.12215 17.6202 1.18164 12.5ZM12.0003 17.5C14.7617 17.5 17.0003 15.2614 17.0003 12.5C17.0003 9.73858 14.7617 7.5 12.0003 7.5C9.23884 7.5 7.00026 9.73858 7.00026 12.5C7.00026 15.2614 9.23884 17.5 12.0003 17.5ZM12.0003 15.5C10.3434 15.5 9.00026 14.1569 9.00026 12.5C9.00026 10.8431 10.3434 9.5 12.0003 9.5C13.6571 9.5 15.0003 10.8431 15.0003 12.5C15.0003 14.1569 13.6571 15.5 12.0003 15.5Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                </div>
            </div>
        </label>
        <label v-if="type == 'textarea'"
            :for="id || 'input-elem'"
            :data-size="size || 'large'"
            class="input-label input-label_textarea"
        ><textarea :id="id || 'input-elem'"
            ref="inputRef"
            :placeholder="placeholder"
            @input="inputFunc"
            :value="localValue"
            :maxlength="maxLength"
            :readOnly="readonly"
            :name="name"
            :data-value="localDataAttr"
        ></textarea>
        <div class="input-label__fake-placeholder" v-if="fakePlaceholder"
            :data-state="placeholderState"
        >{{ fakePlaceholder }}
        </div>
        </label>
        <div class="field__max-length" v-if="maxLength && type == 'textarea'">
            {{ localValue.length }} / {{ maxLength }}
        </div>
        <div class="field__helper" v-if="helper">
            {{ helper }}
        </div>
        <ElementLink v-if="helperLink"
            :link="helperLink"
            size="small"
            color="accent"
        >{{ helperLink }}
        </ElementLink>
    </div>
</template>

<style lang="scss">
    input[type="text"],
    input[type="password"],
    input[type="email"],
    textarea {
        background-color: unset;
        width: 100%;
        outline: unset;
        border: unset;
        padding: 0;
        font-family: "Golos Text", serif;
        &::placeholder {
            @include transition(color);
        }
    }

    .field {
        @include df_fdc;
        gap: .25rem;

        &__helper {
            padding-left: 1rem;
            @include text_2;
            color: $text-primary-transparent-32;
        }
        &__max-length {
            display: flex;
            justify-content: flex-end;
            padding-right: 1rem;
            @include text_2;
            color: $text-primary-transparent-32;
        }
        .link {
            padding-left: 1rem;
        }

        .input-label {
            position: relative;
            display: flex;
            cursor: text;
            overflow: hidden;

            @include transition(background-color);
            input.hidden {
                position: absolute;
                width: 0;
                height: 0;
                overflow: hidden;
            }

            &__fake-placeholder {
                pointer-events: none;
                position: absolute;
                top: 50%;
                left: 1rem;
                transform: translateY(-50%);
                @include text_1;
                text-wrap: nowrap;
                color: $text-primary-transparent-48;
                @include transition(top, font-size, color);
                &[data-state="active"] {
                    color: $text-primary-transparent-48;
                    @include text-2;
                    top: 1rem;
                }
            }
            &__icon-block {
                display: flex;
                gap: .5rem;
                padding-top: .125rem;
                @include mobile {
                    padding-top: .25rem;
                }
            }
            &__text {
                @include text_1;
                color: $text-primary-transparent-32;
            }
            &__icon {
                @include df_fdc;
                height: 1.5rem;
                width: 1.5rem;
                cursor: pointer;
                @include mobile {
                    height: 1.25rem;
                    width: 1.25rem;
                }
                svg {
                    @include wh_100;
                    @include transition(transform);
                    path {
                        @include transition(fill, fill-opacity);
                    }
                }
                &[data-select-opened="true"] {
                    svg {
                        transform: rotate(180deg);
                    }
                }
            }

            &[data-size="large"] {
                padding: 1rem;
                border-radius: .5rem;
                @include mobile {
                    padding: .75rem 1rem;
                    border-radius: .375rem;
                }
                &:has(.input-label__fake-placeholder) {
                    padding-bottom: .5rem;
                    @include mobile {
                        padding-bottom: .25rem;
                    }
                    input,
                    textarea {
                        padding-top: .5rem;
                    }
                }
                input,
                textarea {
                    @include text_1;
                }
            }
            &[data-size="basic"] {
                padding: .5rem;
                border-radius: .5rem;
                @include mobile {
                    padding: .5rem .25rem;
                    border-radius: .375rem;
                }
                input,
                textarea {
                    @include text_1;
                }
            }
            &[data-size="micro"] {
                padding: 0 .25rem;
                border-radius: .5rem;
                input,
                textarea {
                    @include text_2;
                }
            }
            
            &_textarea {
                textarea {
                    resize: none;
                    height: 6.25rem;
                }
                .input-label__fake-placeholder {
                    top: 1rem;
                    transform: none;
                    &[data-state="active"] {
                        top: .5rem;
                    }
                }
            }

            &:has(input:focus) {
                .input-label__fake-placeholder {
                    color: $text-primary;
                    @include text-2;
                    top: 1rem;
                }
            }
            &:has(textarea:focus) {
                .input-label__fake-placeholder {
                    color: $text-primary;
                    @include text-2;
                    top: .5rem;
                }
            }
        }

        &[data-theme="light"] {
            .input-label {
                background-color: $bg-inverse-transparent-4;
                &__icon {
                    svg path {
                        fill: $icon-primary;
                        fill-opacity: .32;
                    }
                }
                input,
                textarea {
                    color: $text-primary;
                    &::placeholder {
                        color: $text-primary-transparent-48;
                    }
                }
                &:hover {
                    background-color: $bg-inverse-transparent-8;
                    .input-label__icon {
                        svg path {
                            fill: $icon-primary;
                            fill-opacity: .48;
                        }
                    }
                }
            }
            &:has(.input-label__fake-placeholder) {
                input,
                textarea {
                    &::placeholder {
                        color: rgba(255, 255, 255, 0);
                    }
                }
            }
            &:has(.input-label__fake-placeholder[data-state="active"]),
            &:has(input:focus),
            &:has(textarea:focus){
                input,
                textarea {
                    &::placeholder {
                        color: $text-primary-transparent-48;
                    }
                }
            }
            &:has(input.error),
            &:has(textarea.error) {
                .input-label {
                    background-color: $bg-system-negative-transparent-8;
                    input {
                        color: $text-system-negative;
                    }
                    &__fake-placeholder {
                        color: $text-system-negative;
                    }
                    input::placeholder {
                        color: $text-system-negative;
                    }
                }
                .field__helper {
                    color: $text-system-negative;
                }
            }
        }
        &[data-theme="dark"] {
            .input-label {
                background-color: $bg-primary;
            }
            .field__helper {
                color: $text-inverse-transparent-48;
            }
            &:has(.input-label__fake-placeholder) {
                input,
                textarea {
                    &::placeholder {
                        color: rgba(255, 255, 255, 0);
                    }
                }
            }
            &:has(.input-label__fake-placeholder[data-state="active"]),
            &:has(input:focus),
            &:has(textarea:focus){
                input,
                textarea {
                    &::placeholder {
                        color: $text-primary-transparent-48;
                    }
                }
            }
            &:has(input.error),
            &:has(textarea.error) {
                .input-label {
                    background-color: $bg-system-negative-subdued-8;
                    input {
                        color: $text-system-negative;
                    }
                    &__fake-placeholder {
                        color: $text-system-negative;
                    }
                    input::placeholder {
                        color: $text-system-negative;
                    }
                }
                .field__helper {
                    color: $text-system-negative;
                }
            }
        }
        &[data-state="disabled"] {
            pointer-events: none;
            .input-label {
                input {
                    color: $text-primary-transparent-48;
                }
                &__fake-placeholder {
                    color: $text-primary-transparent-16;
                }
                input::placeholder {
                    color: $text-primary-transparent-16;
                }
            }
            .field__helper {
                color: $text-primary-transparent-16;
            }
        }
    }

    .delete-btn-enter-active,
    .delete-btn-leave-active {
        @include transition(opacity);
    }

    .delete-btn-enter-from,
    .delete-btn-leave-to {
        opacity: 0;
    }
</style>