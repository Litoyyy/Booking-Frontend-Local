<script lang="ts" setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper-bundle.css';
    import { Pagination } from 'swiper/modules';

    const swiperOptions = {
        modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    };

    const props = defineProps<{
        view: 'horizontal' | 'vertical' | 'horizontal_order' | 'horizontal_small',
        onAdd?: ()=>void,
        res?: Object,
    }>();
</script>

<template>
    <div class="catalog-card" :view="props.view">
        <div class="catalog-card__img-block" v-if="view == 'horizontal' || props.view == 'vertical'">
            <Swiper v-bind="swiperOptions" v-if="res.photos && res.photos.length > 0">
                <SwiperSlide v-for="photo in res.photos">
                    <img :src="photo" alt="catalog card image"/>
                </SwiperSlide>
                <div class="swiper-pagination" slot="pagination"></div>
            </Swiper>
            <Swiper v-bind="swiperOptions" v-else>
                <SwiperSlide>
                    <img src="/images/stub.webp" alt="catalog card image"/>
                </SwiperSlide>
                <div class="swiper-pagination" slot="pagination"></div>
            </Swiper>
            <ElementTag size="small" type="product-card">Лидер продаж</ElementTag>
        </div>
        <div class="catalog-card__img-block" v-else>
            <img :src="res.main_photo" alt="catalog-img" v-if="res.main_photo"/>
            <img src="/images/stub.webp" alt="catalog-img" v-else/>
        </div>
        <div class="catalog-card__info-block">
            <div class="catalog-card__price-block" v-if="view == 'horizontal' || props.view == 'vertical'">
                <div class="catalog-card__price-block__info">
                    <div class="price">
                        {{ res.base_price }} ₽
                        <div class="discount">
                            {{ res.discount }}%
                            <span>
                                {{ res.price }}
                            </span>
                        </div>
                    </div>
                    <div class="count">
                        {{ res.info }}
                    </div>
                </div>
                <ElementIconButton size="large" color="transparent"
                    @click="onAdd"
                ><svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8335 13.333V6.33301H15.1668V13.333H22.1668V15.6663H15.1668V22.6663H12.8335V15.6663H5.8335V13.333H12.8335Z" fill="#1C5BAD"/>
                </svg>
                </ElementIconButton>
            </div>
            <div class="catalog-card__content-block">
                {{ res.title }}
                <span v-if="view !== 'horizontal_small'">{{ res.description }}</span>
            </div>
            <div class="catalog-card__other-info">
                {{ res.other_info }}
            </div>
            <ElementLink color="subaccent" v-if="view == 'horizontal_order'">
                Повысить категорию
            </ElementLink>
        </div>
    </div>
</template>

<style lang="scss">
    .catalog-card {
        display: flex;
        background-color: $bg-inverse-transparent-4;
        border-radius: .5rem;
        overflow: hidden;
        @include mobile {
            border-radius: .375rem;
            flex-direction: column;

        }
        &__img-block {
            position: relative;
            max-height: 17.5rem;
            height: 100%;
            aspect-ratio: 9 / 7;
            img {
                max-height: 17.5rem;
                @include image_cover;
            }
            .swiper-pagination-bullet {
                background-color: $bg-primary-transparent-32;
                width: .5rem;
                height: .5rem;
                aspect-ratio: 1 / 1;
                &.swiper-pagination-bullet-active {
                    background-color: $bg-primary;
                }
            }
            .tag {
                position: absolute;
                top: 1rem;
                left: 1rem;
                z-index: 1;
            }
        }
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
            padding: 2rem;
            @include mobile {
                gap: 1rem;
                padding: 1rem;
            }
        }
        &__price-block {
            @include df_jb_ac;
            &__info {
                @include df_fdc;
                gap: .25rem;
                .price {
                    @include df_ac;
                    gap: 1rem;
                    @include heading_2;
                    .discount {
                        @include df_ac;
                        gap: .5rem;
                        color: $text-system-positive;
                        @include text_2;
                        text-decoration: none;
                        span {
                            @include text_2;
                            color: $text-primary-transparent-48;
                            text-decoration: line-through;
                        }
                    }
                }
                .count {
                    @include text_3;
                    color: $text-primary-transparent-48;
                }
            }
        }
        &__content-block {
            @include df_fdc;
            gap: .5rem;
            @include text_1;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
        &__other-info {
            @include text_2;
            color: $text-primary-transparent-48;
        }
        &[view="vertical"] {
            flex-direction: column;
            .catalog-card__img-block {
                max-height: 15.875rem;
                aspect-ratio: 222 / 127;
                img {
                    max-height: 15.875rem;
                    @include mobile {
                        max-height: 13.125rem;
                    }
                }
                @include mobile {
                    aspect-ratio: 23 / 14;
                    max-height: 13.125rem;
                }
            }
        }
        &[view="horizontal_order"] {
            .catalog-card__img-block {
                max-height: 13rem;
                aspect-ratio: 139 / 104;
                img {
                    max-height: 13rem;
                }
            }
            .catalog-card__info-block {
                padding: 1.5rem;
                @include mobile {
                    gap: 1rem; 
                    padding: 1rem;  
                }
            }
        }
        &[view="horizontal_small"] {
            .catalog-card__img-block {
                max-height: 6.75rem;
                aspect-ratio: 50 / 27;
                img {
                    max-height: 6.75rem;
                }
            }
            .catalog-card__info-block {
                padding: 1.5rem;
                gap: .5rem;
            }
        }
    }
</style>