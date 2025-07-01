<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Заселение гостей">
        <form class="popup__form">
            <ElementInput 
            fake-placeholder="№ брони" 
            name="reservation_number"
            id="gantt-arrivals-check-in-reservation-number"></ElementInput>
            <ElementInput 
            fake-placeholder="Категория комнаты" 
            name="room_category"
            id="gantt-arrivals-check-in-category"></ElementInput>
            <SelectDefault 
            fake-placeholder="Номер комнаты"
            id="gantt-arrivals-check-in-room-number"></SelectDefault>
            <DatePicker id="gantt-arrivals-check-in-date" 
            firstPlaceholder="Дата"></DatePicker>
            <TimePicker id="gantt-arrivals-check-in-time" 
            fake-placeholder="Время"></TimePicker>
        </form>
        <div class="popup__button-block">
            <ElementButton size="large" 
            name="button">
                Сохранить
            </ElementButton>
            <ElementButton size="large" 
            color="transparent" 
            name="button">
                Заселить с оплатой
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