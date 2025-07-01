<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Параметры проживания" description="3, Стандарт с широкой кроватью">
        <form class="popup__form">
            <DatePicker rangeSelect id="booking-card-accommodation-date"></DatePicker>
            <SelectDefault 
            fake-placeholder="Взрослых"
            id="booking-card-accommodation-adults"></SelectDefault>
            <SelectDefault 
            fake-placeholder="Детей"
            id="booking-card-accommodation-childs"></SelectDefault>
            <SelectDefault 
            fake-placeholder="Возраст первого ребенка"
            id="booking-card-accommodation-child-age-1"></SelectDefault>
            <SelectDefault 
            fake-placeholder="Возраст второго ребенка    "
            id="booking-card-accommodation-child-age-1"></SelectDefault>
        </form>
        <ElementButton size="large" name="button">
            Применить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &::v-deep(.popup__header__description) {
            color: $text-primary-transparent-48;
        }
        &__form {
            @include grid(2, 1rem);
            .calendar-container {
                grid-column: span 2;
            }
        }
    }
</style>