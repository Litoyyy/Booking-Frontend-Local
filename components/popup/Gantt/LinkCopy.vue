<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Копировать ссылки на категории">
        <form class="popup__form">
            <SelectDefault 
            fake-placeholder="Категории номеров"
            id="gantt-arrivals-cancellation-number"></SelectDefault>
            <DatePicker rangeSelect></DatePicker>
            <ElementInput 
            fake-placeholder="Ссылка на категории" 
            type="textarea"
            name="reservation_number"
            id="gantt-arrivals-cancellation-number"></ElementInput>
        </form>
        <ElementButton size="large" name="button">
            Скопировать
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__form {
            @include df_fdc;
            gap: 1rem;
        }
    }
</style>