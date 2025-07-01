<script setup lang="ts">
    const props = defineProps<{
        color: 'green' | 'orange' | 'red' | 'gray',
        type?: 'create',
        firstName?: string,
        lastName?: string,
        price?: string,
    }>()
</script>

<template>
    <div class="gantt" 
        :data-color="props.type"
        v-if="type=='create'"
    >
        #day-count
    </div>
    <div class="gantt"
        :data-color="props.color"
        v-else
    ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.0835 5.83301C7.77385 5.83301 8.3335 5.27337 8.3335 4.58301C8.3335 3.89265 7.77385 3.33301 7.0835 3.33301C6.39314 3.33301 5.8335 3.89265 5.8335 4.58301C5.8335 5.27337 6.39314 5.83301 7.0835 5.83301ZM7.0835 11.2497C7.77385 11.2497 8.3335 10.69 8.3335 9.99967C8.3335 9.30934 7.77385 8.74967 7.0835 8.74967C6.39314 8.74967 5.8335 9.30934 5.8335 9.99967C5.8335 10.69 6.39314 11.2497 7.0835 11.2497ZM8.3335 15.4163C8.3335 16.1067 7.77385 16.6663 7.0835 16.6663C6.39314 16.6663 5.8335 16.1067 5.8335 15.4163C5.8335 14.726 6.39314 14.1663 7.0835 14.1663C7.77385 14.1663 8.3335 14.726 8.3335 15.4163ZM12.9168 5.83301C13.6072 5.83301 14.1668 5.27337 14.1668 4.58301C14.1668 3.89265 13.6072 3.33301 12.9168 3.33301C12.2265 3.33301 11.6668 3.89265 11.6668 4.58301C11.6668 5.27337 12.2265 5.83301 12.9168 5.83301ZM14.1668 9.99967C14.1668 10.69 13.6072 11.2497 12.9168 11.2497C12.2265 11.2497 11.6668 10.69 11.6668 9.99967C11.6668 9.30934 12.2265 8.74967 12.9168 8.74967C13.6072 8.74967 14.1668 9.30934 14.1668 9.99967ZM12.9168 16.6663C13.6072 16.6663 14.1668 16.1067 14.1668 15.4163C14.1668 14.726 13.6072 14.1663 12.9168 14.1663C12.2265 14.1663 11.6668 14.726 11.6668 15.4163C11.6668 16.1067 12.2265 16.6663 12.9168 16.6663Z" fill="white"/>
    </svg>
    #{{ firstName }}, #{{ lastName }}
    <span v-if="price">{{ price }} ₽</span>
    </div>
</template>

<style lang="scss">
    .gantt {
        position: relative;
        @include df_ac;
        gap: .5rem;
        padding: .25rem .5rem;
        padding-left: .25rem;
        width: fit-content;
        @include text_2;

        border-radius: .25rem;
        border-width: 0 .5rem 0 .5rem;
        border-style: solid;
        border-color: $border-primary-transparent-16;

        outline-width: 1px;
        outline-style: solid;
        outline-color: rgba(255, 255, 255, 0);

        @include transition (outline-color);
        &[data-color="green"] {
            background-color: $bg-system-positive;
            color: $text-inverse;
            svg path {
                fill: $icon-inverse;
            }
            span {
                color: $text-inverse-transparent-48;
            }
        }
        &[data-color="orange"] {
            background-color: $bg-subaccent;
            color: $text-inverse;
            svg path {
                fill: $icon-inverse;
            }
            span {
                color: $text-inverse-transparent-48;
            }
        }
        &[data-color="red"] {
            background-color: $bg-system-negative;
            color: $text-inverse;
            svg path {
                fill: $icon-inverse;
            }
            span {
                color: $text-inverse-transparent-48;
            }
        }
        &[data-color="gray"] {
            background-color: $bg-inverse-subdued-16;
            color: $text-primary-transparent-32;
            svg path {
                fill: $icon-primary-transparent-48;
            }
            span {
                color: $text-primary-transparent-16;
            }
        }

        &[data-color="create"] {
            border-width: 1px;
            border-style: dashed;
            border-color: $border-system-positive;
            &:hover {
                outline-color: rgba(255, 255, 255, 0);
            }
        }

        &:hover {
            outline-color: $border-primary;
        }
    }
</style>