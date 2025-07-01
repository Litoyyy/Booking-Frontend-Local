<script lang="ts" setup>
    interface ListItem {
        name: string;
    }

    const props = defineProps<{
        res?: Object,
        id?: string,
        name?: string,
        isActive?: boolean,
        onClick?: ()=>void,
    }>();
</script>

<template>
    <label :for="`tarrif-card-input-${id}`" class="tariff-card">
        <div class="tariff-card__info-block">
            <div class="tariff-card__info-block__name">
                {{ res.title }}
            </div>
            <div class="tariff-card__info-block__list">
                <div class="tariff-card__info-block__list__item" v-for="item in props.res.list">
                    <span>
                        {{ item.name }}
                    </span>
                    <ElementPopover></ElementPopover>
                </div>
            </div>
        </div>
        <div class="tariff-card__price-block">
            <div class="tariff-card__price-block__price">
                {{ res.price }} ₽
                <div class="discount">
                    {{ res.discount }}%
                    <span>{{ res.base_price }}</span>
                </div>
            </div>
            <div class="add-button">
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8335 13.333V6.33301H15.1668V13.333H22.1668V15.6663H15.1668V22.6663H12.8335V15.6663H5.8335V13.333H12.8335Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
                <svg height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6663 18.1991L22.3908 7.47461L24.0407 9.12452L11.6663 21.4989L4.2417 14.0743L5.89162 12.4244L11.6663 18.1991Z" fill="#1C5BAD"/>
                </svg>
            </div>
        </div>
        <input type="radio" 
            class="tariff-card__input"
            :id="`tarrif-card-input-${id}`"
            :name="name"
            :checked="isActive"
            @change="onClick">
    </label>
</template>

<style lang="scss">
    .tariff-card {
        @include df_fdc;
        justify-content: space-between;
        gap: 2rem;
        padding: 1.5rem;
        border-radius: .5rem;
        border: 1px solid $border-primary-transparent-8;
        @include transition(border);
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
            &__name {
                @include heading_3;
                text-transform: uppercase;
            }
            &__list {
                @include df_fdc;
                gap: .5rem;
                &__item {
                    @include df_ac;
                    span {
                        width: 100%;
                        @include text_2;
                    }
                }
            }
        }
        &__price-block {
            @include df_jb_ac;
            &__price {
                @include df_ac;
                gap: .5rem;
                @include heading_3;
                .discount {
                    @include df_ac;
                    gap: .25rem;
                    @include text_2;
                    color: $text-system-positive;
                    span {
                        @include text_2;
                        text-decoration: line-through;
                        color: $text-primary-transparent-48;
                    }
                }
            }
            .add-button {
                max-height: 1.75rem;
                aspect-ratio: 1;
                cursor: pointer;
                svg {
                    display: none;
                    @include wh-100;
                    &:first-of-type {
                        display: unset;
                    }
                }
            }
        }
        &__input {
            position: absolute;
            opacity: 0;
        }
        &:hover {
            border-color: $border-primary-transparent-16;
        }
        &[state="active"],
        &:has(input:checked) {
            border-color: $border-accent;
            .add-button svg {
                &:first-of-type {
                    display: none;
                }
                &:last-of-type {
                    display: unset;
                }
            }
        }
    }
</style>