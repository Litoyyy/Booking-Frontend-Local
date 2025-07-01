<script lang="ts" setup>
    const props = defineProps<{
        res?: Object,
        type: 'booking' | 'tariff',
        color?: 'white' | 'grey'
    }>();

    const itemBody = ref<HTMLElement | null>(null);

    const toggleHeight = (show: boolean) => {
        itemBody.value?.style.setProperty("max-height", show ? `${itemBody.value.scrollHeight}px` : "0px");
    };
</script>

<template>
    <div class="notification-booking" @mouseenter="toggleHeight(true)" @mouseleave="toggleHeight(false)" :data-color="props.color">
        <div class="notification-booking__button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V10C11 10.5523 10.5523 11 10 11H4C3.44772 11 3 10.5523 3 10V4ZM3 14C3 13.4477 3.44772 13 4 13H10C10.5523 13 11 13.4477 11 14V20C11 20.5523 10.5523 21 10 21H4C3.44772 21 3 20.5523 3 20V14ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11H14C13.4477 11 13 10.5523 13 10V4ZM13 14C13 13.4477 13.4477 13 14 13H20C20.5523 13 21 13.4477 21 14V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V14Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
        </div>
        <div class="notification-booking__info-block">
            <div class="notification-booking__info-block__title-block">
                <span v-if="type == 'booking'">Бронирование</span>
                <span v-else>Тарифы</span>
                <div class="title" v-if="type == 'booking'">
                    {{ res.number }}
                </div>
                <div class="title" v-else>
                    Отсутствуют цены на ближайшие даты.
                </div>
            </div>
            <div class="notification-booking__info-block__description" v-if="type == 'tariff'">
                Если они останутся незаполненными до 22:00, система автоматически подставит последнюю цену
            </div>
            <div class="notification-booking__info-block__body" ref="itemBody">
                <div class="notification-booking__info-block__content">
                    <span v-if="type == 'booking'">
                        Просмотрено
                    </span>
                    <div class="button-block" v-if="color !== 'grey' && props.type == 'booking'">
                        <ElementIconButton color="positive">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6663 17.6995L22.3908 6.9751L24.0407 8.62501L11.6663 20.9993L4.2417 13.5748L5.89162 11.9249L11.6663 17.6995Z" fill="white"/>
                            </svg>
                        </ElementIconButton>
                        <ElementIconButton color="negative">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9998 12.3509L19.7746 6.57617L21.4245 8.22608L15.6497 14.0008L21.4245 19.7755L19.7746 21.4254L13.9998 15.6507L8.22512 21.4254L6.5752 19.7755L12.3499 14.0008L6.5752 8.22608L8.22512 6.57617L13.9998 12.3509Z" fill="white"/>
                            </svg>
                        </ElementIconButton>
                    </div>
                    <div class="button-block button-block_tariff" v-if="type == 'tariff'">
                        <ElementLink size="small" color="subaccent">Заполнить</ElementLink>
                        <ElementLink size="small" color="accent">Просмотрено</ElementLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="notification-booking__time">
            <span>{{ res.time }}</span>
            <div class="price" v-if="type == 'booking'">
                {{ res.price }} ₽
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .notification-booking {
        padding: 1rem;
        background-color: $bg-primary;
        border-radius: .5rem;
        display: flex;
        gap: 1rem;

        grid-column: span 4;
        &__button {
            max-height: 1.5rem;
            aspect-ratio: 1;
            svg {
                @include wh-100;
            }
        }
        &__info-block {
            @include df_fdc;
            width: 100%;
            gap: .5rem;
            &__title-block {
                @include df_fdc;
                @include text_1;
                span {
                    @include text_2;
                    color: $text-primary-transparent-48;
                }
            }
            &__body {
                max-height: 0;
                overflow: hidden;

                @include transition(max-height);
            }
            &__content {
                @include text_2;
                color: $text-accent;
                @include df_fdc;
                gap: .5rem;
                .button-block {
                    @include df_ac;
                    gap: .75rem;
                }
            }
        }
        &__time {
            @include df_fdc;
            align-items: flex-end;
            @include strong_1;
            text-wrap: nowrap;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
        &[data-color="grey"] {
            background-color: $bg-inverse-subdued-4;
        }
    }
</style>