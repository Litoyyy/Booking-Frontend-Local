<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Цена на проживание" description="24 ноя (ВС)">
        <form class="popup__form">
            <div class="popup__form__label-block">
                <SelectDefault
                fake-placeholder="Тип скидки"
                id="booking-card-live-cost-type-discount"
                name="type_discount">
                </SelectDefault>
                <ElementInput 
                fake-placeholder="Значение"
                id="booking-card-live-cost-price"
                name="price"
                inputLabelText="₽"></ElementInput>
                <ElementInput 
                fake-placeholder="Причина"
                type="textarea"
                :max-length="300"
                id="booking-card-live-cost-cause"
                name="cause"></ElementInput>
            </div>
            <div class="popup__form__checkbox-block">
                <ElementRadio id="booking-card-live-cost-date-current"
                name="date_radio"
                checked>К выбранной дате</ElementRadio>
                <ElementRadio id="booking-card-live-cost-date-current-next"
                name="date_radio">К выбранной и следующим</ElementRadio>
                <ElementRadio id="booking-card-live-cost-date-all"
                name="date_radio">Ко всем</ElementRadio>
            </div>
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
            gap: 1.5rem;
            &__label-block,
            &__checkbox-block {
                @include df_fdc;
                gap: 1rem;
            }
        }
    }
</style>