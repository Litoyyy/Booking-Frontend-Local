<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Доплатить за ранний заезд">
        <form class="popup__form">
            <ElementInput 
            fake-placeholder="Сумма"
            id="booking-card-extra-payment-price"
            name="price"
            inputLabelText="₽"></ElementInput>
            <ElementInput 
            fake-placeholder="Причина"
            type="textarea"
            :max-length="300"
            id="booking-card-extra-payment-cause"
            name="cause"></ElementInput>
        </form>
        <ElementButton size="large" name="button">
            Применить
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