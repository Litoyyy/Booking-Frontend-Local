<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Добавить заметку">
        <form class="popup__form">
            <ElementInput fake-placeholder="Текст заметки"
            type="textarea"
            :max-length="300"
            id="booking-card-mark-create-text"
            name="text"></ElementInput>
            <SelectDefault
            fake-placeholder="Плательщик"
            id="booking-card-mark-create-status"
            name="status">
            </SelectDefault>
        </form>
        <ElementButton size="large" name="button">
            Сохранить
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