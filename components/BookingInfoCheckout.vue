<script lang="ts" setup>
    const props = defineProps<{
        category: string,
        service: string,
        guest: string,
        date: string,
        tariff: string,
        price: string,
        state: 'static' | 'filled' | 'generated'
    }>();
</script>

<template>
    <div class="booking-info-checkout" :state="props.state || 'static'">
        <div class="booking-info-checkout__title">
            Обзор брони
        </div>
        <div class="booking-info-checkout__info">
            <span>Категория номера</span>
            {{ category || '-' }}
        </div>
        <div class="booking-info-checkout__info">
            <span>Доп.услуги</span>
            {{ service || '-' }}
        </div>
        <div class="booking-info-checkout__info">
            <span>Гость</span>
            {{ guest || '-' }}
        </div>
        <div class="booking-info-checkout__info">
            <span>Гости и дата</span>
            {{ date || '-' }}
        </div>
        <div class="booking-info-checkout__info">
            <span>Тариф</span>
            {{ tariff || '-' }}
        </div>
        <div class="booking-info-checkout__price">
            {{ price || '?' }} ₽
        </div>
        <div class="booking-info-checkout__button-block">
            <ElementButton v-if="state === 'static' || !props.state" :disabled="true" size="large">
                Создать бронь
            </ElementButton>
            <ElementButton v-else size="large">
                Создать бронь
            </ElementButton>
            <div class="booking-info-checkout__icon-button-block" v-if="state === 'generated'">
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
        </div>
    </div>
</template>

<style lang="scss">
    .booking-info-checkout {
        background-color: $bg-primary;
        @include df_fdc;
        gap: 1.5rem;
        &__title {
            @include heading_3;
        }
        &__info {
            @include df_fdc;
            @include text_1;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
        &__price {
            @include heading_3;
        }
        &__icon-button-block {
            @include df_ac;
            gap: .75rem;
        }
        &[state="generated"] {
            .button {
                display: none;
            }
        }
    }
</style>