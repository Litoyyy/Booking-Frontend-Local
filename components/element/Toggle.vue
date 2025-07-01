<script setup lang="ts">
    const props = defineProps<{
        type?: 'locked',
        id?: string,
        checked?: boolean,
        onChange?: (checked: boolean)=>void
    }>();

    const emit = defineEmits<{
        (event: "update:checked", value: boolean): void;
    }>();
</script>

<template>
    <label class="toggle"
        :for="props.id"
        :data-type="props.type"
    ><input type="checkbox"
        :id="props.id"
        :checked="props.type == 'locked' || checked"
        @click="(event: Event)=>{
            const target = event.target as HTMLInputElement;
            emit('update:checked', target.checked);
            if(props.onChange) props.onChange(target.checked);
        }"
    ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="type == 'locked'">
        <path d="M12.6667 6.66634H13.3333C13.7015 6.66634 14 6.96481 14 7.33301V13.9997C14 14.3679 13.7015 14.6663 13.3333 14.6663H2.66667C2.29848 14.6663 2 14.3679 2 13.9997V7.33301C2 6.96481 2.29848 6.66634 2.66667 6.66634H3.33333V5.99967C3.33333 3.42235 5.42267 1.33301 8 1.33301C10.5773 1.33301 12.6667 3.42235 12.6667 5.99967V6.66634ZM11.3333 6.66634V5.99967C11.3333 4.15873 9.84093 2.66634 8 2.66634C6.15905 2.66634 4.66667 4.15873 4.66667 5.99967V6.66634H11.3333ZM7.33333 9.33301V11.9997H8.66667V9.33301H7.33333Z" fill="#E68F6F"/>
    </svg>
    </label>
</template>

<style lang="scss">
    .toggle {
        position: relative;
        @include df_ac;
        height: 1.5rem;
        aspect-ratio: 2 / 1;
        border-radius: 1000px;
        background-color: $bg-inverse-transparent-8;
        @include transition(background-color);
        cursor: pointer;

        input {
            opacity: 0;
            cursor: pointer;
        }
        &::before {
            pointer-events: none;
            content: '';
            position: absolute;
            left: .125rem;
            top: 50%;
            transform: translate(0, -50%);
            height: 1.25rem;
            aspect-ratio: 1;
            background-color: $bg-primary;
            border-radius: 50%;
            @include transition(transform);
        }
        &[data-type="locked"] {
            pointer-events: none;
            max-width: 4rem;
            &::before {
                height: 1.75rem;
            }
            svg {
                position: absolute;
                top: 50%;
                right: .5rem;
                transform: translateY(-50%);
                width: 1rem;
                aspect-ratio: 1;
            }
        }

        &:hover {
            background-color: $bg-inverse-transparent-16;
        }
        &:has(input:checked) {
            background-color: $bg-subaccent;
            &::before {
                transform: translate(1.5rem, -50%);
            }
            &[data-type="locked"] {
                &::before {
                transform: translate(2rem, -50%);
            }
            }
        }
    }
</style>