<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Внести депозит">
        <form class="popup__form">
            <SelectDefault
            fake-placeholder="Плательщик"
            id="booking-card-deposit-payer"
            name="payer">
            </SelectDefault>
            <ElementInput 
            fake-placeholder="Вносимая сумма"
            id="booking-card-deposit-price"
            name="price"
            inputLabelText="₽"></ElementInput>
            <ElementInput 
            fake-placeholder="Комментарий"
            type="textarea"
            :max-length="300"
            id="booking-card-deposit-comment"
            name="comment"></ElementInput>
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