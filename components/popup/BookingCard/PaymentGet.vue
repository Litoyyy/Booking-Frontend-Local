<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Получить оплату">
        <div class="popup__info-block">
            <div class="popup__info-block__item">
                <div class="key">Способ получения оплаты</div>
                <div class="value">Отправка ссылки на почту</div>
            </div>
            <div class="popup__info-block__item">
                <div class="key">Сумма по брони, ₽</div>
                <div class="value">22 800</div>
            </div>
        </div>
        <form class="popup__form">
            <ElementInput fake-placeholder="Сумма оплаты"
            id="booking-card-payment-get-payment-amount"
            input-label-text="₽"
            name="payment"></ElementInput>
            <ElementInput fake-placeholder="Номер телефона заказчика"
            id="booking-card-payment-get-payment-phone"
            popover="test"
            name="phone"></ElementInput>
        </form>
        <ElementButton size="large">
            Получить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__info-block {
            @include df_fdc;
            gap: 1rem;
            &__item {
                @include df_ac;
                gap: 1rem;
                @include text_1;
                .key {
                    flex: 1;
                    color: $text-primary-transparent-48;
                }
                .value {
                    flex: 1;
                }
            }
        }
        &__form {
            @include grid(2, 1rem);
        }
    }
</style>