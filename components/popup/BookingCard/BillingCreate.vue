<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Добавить счет">
        <form class="popup__form">
            <ElementInput 
            fake-placeholder="Вносимая сумма"
            id="booking-card-billing-create-account-number"
            name="acoount_number"
            inputLabelText="₽">
            </ElementInput>
            <SelectDefault
            fake-placeholder="Плательщик"
            id="booking-card-billing-create-payer"
            name="payer">
            </SelectDefault>
            <SelectDefault
            fake-placeholder="Плательщик"
            >
            </SelectDefault>
            <SelectDefault
            fake-placeholder="Номер"
            id="booking-card-billing-create-number"
            name="number">
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