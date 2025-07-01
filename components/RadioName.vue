<script lang="ts" setup>
    const props = defineProps<{
        res: Object,
        onUpdate?: (checked: boolean)=>void,
    }>();
</script>

<template>
    <label :for="'radio-name-input-'+res.id" class="radio-name">
        <ElementRadio 
            :id="'radio-name-input-' + res.id" 
            name="radio-name-input"
            :on-update="props.onUpdate"
        />
        <div class="radio-name__image">
            <img :src="res.main_photo" alt="radio image" v-if="res.main_photo">
            <img src="/_nuxt/assets/images/stub.webp" alt="radio image" v-else>
        </div>
        <div class="radio-name__title-block">
            {{ res.title }}
            <span>{{ res.square }} м², {{ res.places }} места</span>
        </div>
        <div class="radio-name__price">
            от {{ res.price }} ₽
        </div>
    </label>
</template>

<style lang="scss">
    .radio-name {
        @include df_ac;
        gap: 1rem;
        padding: 1rem;
        border-radius: .5rem;
        background-color: $bg-inverse-transparent-4;
        cursor: pointer;
        &__image {
            aspect-ratio: 1;
            height: 3rem;
            border-radius: .5rem;
            img {
                @include image_cover;
                border-radius: .5rem;
            }
        }
        &__title-block {
            @include df_fdc;
            @include text_1;
            width: 100%;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
        &__price {
            @include text_1;
            color: $text-primary-transparent-48;
            text-wrap: nowrap;
        }
        &:hover {
            .custom-radio-label::before {
                background-color: $bg-inverse-transparent-16;
            }
        }
        &:has(input:checked) {
            .custom-radio-label::before {
                background-color: $bg-subaccent;
            }
        }
    }
</style>