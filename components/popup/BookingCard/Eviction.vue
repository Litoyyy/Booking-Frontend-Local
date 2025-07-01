<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Выселить гостей">
        <div class="popup__warning">
            Бронирование содержит неоплаченные счета  для номера «6, Стандарт с широкой кроватью». Выезд может быть совершен после оформления платежа.
        </div>
        <form class="popup__form">
            <ElementInput fake-placeholder="№ бронирования"
            id="booking-card-eviction-booking-number"
            name="number"></ElementInput>
            <SelectDefault fake-placeholder="Категория номера"
            id="booking-card-eviction-room-category"
            name="number"></SelectDefault>
            <SelectDefault fake-placeholder="Номер комнаты"
            id="booking-card-eviction-room-number"
            name="number"></SelectDefault>
            <DatePicker id="booking-card-eviction-date"
            fake-placeholder="Дата выселения"></DatePicker>
            <TimePicker id="booking-card-eviction-time"
            fake-placeholder="Время"></TimePicker>
        </form>
        <div class="popup__button-block">
            <ElementButton name="button" 
                size="large">
                Выселить
            </ElementButton>
            <ElementButton name="button" 
                size="large" 
                color="transparent">
                Оплатить
            </ElementButton>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__warning {
            @include text_1;
            color: $text-system-negative;
        }
        &__form {
            @include grid(2, 1rem);
            .field {
                &:first-of-type {
                    grid-column: span 2;
                }
            }
            .time-picker {
                max-width: none;
            }
        }
        &__button-block {
            @include df_ac;
            gap: 1rem;
        }
    }
</style>