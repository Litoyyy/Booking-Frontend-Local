<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Редактировать цену">
        <form class="popup__form">
            <ElementInput fake-placeholder="Цена"
            id="booking-card-service-price-edit-price"
            name="price"></ElementInput>
            <ElementInput fake-placeholder="Причина"
            type="textarea"
            :max-length="300"
            id="booking-card-service-price-edit-cause"
            name="cause"></ElementInput>
            <ElementCheckbox id="booking-card-service-price-edit-all-date">
                Ко всем датам
            </ElementCheckbox>
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