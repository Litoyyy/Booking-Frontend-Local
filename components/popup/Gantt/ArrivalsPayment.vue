<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Оплата по счету 313587737-01">
        <form class="popup__form">
            <ElementInput 
            fake-placeholder="Плательщик" 
            name="reservation_number"
            id="gantt-arrivals-payment-reservation-number"></ElementInput>
            <DatePicker id="gantt-arrivals-payment-date" 
            firstPlaceholder="Дата"></DatePicker>
            <TimePicker id="gantt-arrivals-payment-time" 
            fake-placeholder="Время"></TimePicker>
            <SelectDefault 
            fake-placeholder="Номер комнаты"
            id="gantt-arrivals-payment-room-number"></SelectDefault>
            <ElementInput 
            fake-placeholder="Вносимая плата" 
            name="room_category"
            id="gantt-arrivals-payment-category"></ElementInput>
            <ElementInput 
            fake-placeholder="Комментарий" 
            name="room_category"
            type="textarea"
            :max-length="300"
            inputLabelText="₽"
            id="gantt-arrivals-payment-category"></ElementInput>
        </form>
        <div class="popup__button-block">
            <ElementButton size="large" 
            name="button">
                Применить
            </ElementButton>
            <ElementButton size="large" 
            color="transparent" 
            name="button">
                Применить и выселить гостей
            </ElementButton>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__form {
            @include grid(2, 1rem);
            .field {
                &:first-of-type {
                    grid-column: span 2;
                }
                &:last-of-type {
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