<script setup lang="ts">
    const props = defineProps<{
        type?: 'multiselect' | 'product-card',
        state?: 'deletable',
        onDelete?: ()=>void,
    }>();

    let display = ref(true);

    const handleDelete=()=> {
        display.value = false;
        if(props.onDelete) props.onDelete();
    }
</script>

<template>
    <div class="tag" 
        v-if="display"
        :data-type="props.type || 'multiselect'" 
    ><slot />
        <svg v-if="state === 'deletable' && display" @click="handleDelete" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99983 8.82208L14.1247 4.69727L15.3032 5.87577L11.1783 10.0006L15.3032 14.1253L14.1247 15.3038L9.99983 11.1791L5.87505 15.3038L4.69653 14.1253L8.82133 10.0006L4.69653 5.87577L5.87505 4.69727L9.99983 8.82208Z" fill="#2D3033" fill-opacity="0.32"/>
        </svg>
    </div>
</template>

<style lang="scss">
    .tag {
        @include df_ac;
        width: fit-content;
        padding: .25rem .5rem;
        border-radius: .5rem;
        cursor: pointer;
        @include mobile {
            padding: .125rem;
            border-radius: .375rem;
        }
        &[data-type="product-card"] {
            background-color: $bg-primary;
            color: $text-subaccent;
            @include text_2;
        }
        &[data-type="multiselect"] {
            gap: .25rem;
            background-color: $bg-accent-transparent-8;
            @include text_1;
            &:has(svg) {
                padding-right: .25rem;
            }
        }
        svg {
            path {
                fill: $icon-primary-transparent-32;
                @include transition(fill);
            }
        }
        &:hover {
            svg path {
                fill: $icon-primary;
            }
        }
    }
</style>