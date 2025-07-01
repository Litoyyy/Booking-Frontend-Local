<script lang="ts" setup>
    const props = defineProps<{
        res?: Object,
        id?: string,
        name?: string,
        onClick?: (checked: boolean)=>void,
    }>();

    const localState = ref('');

    const handleState = (checked: boolean) =>{
        localState.value = checked ? 'active' : '';
    };
</script>

<template>
    <label :for="`service-card-input-${id}`" class="service-card" :state="props.state">
        <div class="service-card__img-block">
            <img :src="res.main_photo" alt="service-img" v-if="res.main_photo">
            <img src="/images/stub.webp" alt="service-img" v-else>
            <ElementTag type="product-card" v-if="res.tag">
                {{ res.tag }}
            </ElementTag>
        </div>
        <div class="service-card__info-block">
            <div class="service-card__price-block">
                <div class="service-card__price-block__price">
                    {{ res.price }} ₽
                    <span>{{ res.info }}</span>
                </div>
                <ElementIconButton color="transparent" :state="localState" displayDiv>
                    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!localState">
                        <path d="M12.8335 13.333V6.33301H15.1668V13.333H22.1668V15.6663H15.1668V22.6663H12.8335V15.6663H5.8335V13.333H12.8335Z" fill="#1C5BAD"/>
                    </svg>
                    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
                        <path d="M11.6663 18.1991L22.3908 7.47461L24.0407 9.12452L11.6663 21.4989L4.2417 14.0743L5.89162 12.4244L11.6663 18.1991Z" fill="white"/>
                    </svg>
                </ElementIconButton>
            </div>
            <div class="service-card__content">
                <div class="service-card__content__name">
                    {{ res.title }}
                    <ElementPopover></ElementPopover>
                </div>
                {{ res.type }}
            </div>
        </div>
        <input type="checkbox" 
            class="service-card__input"
            :id="`service-card-input-${id}`"
            :name="name"
            @change="(event) => {
                onClick?.((event.target as HTMLInputElement)?.checked);
                handleState((event.target as HTMLInputElement)?.checked);
            }">
    </label>
</template>

<style lang="scss">
    .service-card {
        position: relative;
        border-radius: .5rem;
        background-color: $bg-inverse-transparent-4;
        overflow: hidden;
        height: fit-content;
        &__img-block {
            position: relative;
            height: 100%;
            aspect-ratio: 74 / 39;
            .tag {
                position: absolute;
                top: 1rem;
                left: 1rem;
                @include transition(all);
            }
            img {
                @include image_cover;
            }
        }
        &__info-block {
            padding: 1.5rem;
            @include df_fdc;
            gap: 1.5rem;
        }
        &__price-block {
            @include df_jb_ac;
            &__price {
                @include df_fdc;
                @include heading_3;
                span {
                    @include text_3;
                    color: $text-primary-transparent-48;
                }
            }
        }
        &__input {
            position: absolute;
            opacity: 0;
            scale: 0
        }
        &__content {
            @include df_fdc;
            gap: .25rem;
            @include text_2;
            color: $text-primary-transparent-48;
            &__name {
                @include df_ac;
                justify-content: space-between;
                gap: .25rem;
                @include text_1;
                color: $text-primary;
            }
        }
        &:hover {
            .service-card__img-block {
                .tag {
                    scale: 0;
                    opacity: 0;
                    @include transition(all);
                }
            }
        }
    }
</style>