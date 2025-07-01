<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Назначить номер">
        <form class="popup__form">
            <ElementInput 
            fake-placeholder="№ брони" 
            name="reservation_number"
            id="gantt-arrivals-asign-reservation-number"></ElementInput>
            <ElementInput 
            fake-placeholder="Категория комнаты" 
            name="room_category"
            id="gantt-arrivals-asign-category"></ElementInput>
            <SelectDefault 
            fake-placeholder="Номер комнаты"
            id="gantt-arrivals-asign-room-number"></SelectDefault>
        </form>
        <ElementButton size="large" name="button">
            Сохранить
        </ElementButton>
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
        }
    }
</style>