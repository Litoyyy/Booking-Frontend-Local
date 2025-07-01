<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Отмена бронирования">
        <form class="popup__form">
            <SelectDefault 
            fake-placeholder="Причина отмены"
            id="gantt-arrivals-cancellation-number"></SelectDefault>
            <ElementInput 
            fake-placeholder="Комментарий" 
            type="textarea"
            name="reservation_number"
            id="gantt-arrivals-cancellation-number"
            :max-length="300"></ElementInput>
        </form>
        <ElementButton size="large" name="button">
            Подтвердить
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