<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Скидка на проживание" description="24 ноя (ВС)">
        <hr>
        <div class="popup__price-block">
            <div class="popup__price-block__title">
                Цена
            </div>
            <div class="popup__price-block__price">
                <div class="popup__price-block__item">
                    <div class="key">Прежняя</div>
                    <div class="value">18 900</div>
                </div>
                <div class="popup__price-block__item">
                    <div class="key">Со скидкой</div>
                    <div class="value">18 900</div>
                </div>
            </div>
        </div>
        <hr>
        <form class="popup__form">
            <div class="popup__form__title">
                Скидка
            </div>
            <div class="popup__form__label-block">
                <SelectDefault
                fake-placeholder="Тип скидки"
                id="booking-card-live-discount-type-discount"
                name="type_discount">
                </SelectDefault>
                <ElementInput 
                fake-placeholder="Значение"
                id="booking-card-live-discount-price"
                name="price"
                inputLabelText="%"></ElementInput>
                <ElementInput 
                fake-placeholder="Причина"
                type="textarea"
                :max-length="300"
                id="booking-card-live-discount-cause"
                name="cause"></ElementInput>
            </div>
            <div class="popup__form__radio-block">
                <ElementRadio id="booking-card-live-discount-date-current"
                name="date_radio"
                checked>К выбранной дате</ElementRadio>
                <ElementRadio id="booking-card-live-discount-date-current-next"
                name="date_radio">К выбранной и следующим</ElementRadio>
                <ElementRadio id="booking-card-live-discount-date-all"
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
        hr {
            border: 0;
            border-bottom: 1px solid $border-primary-transparent-8;
        }
        &__price-block {
            @include df_fdc;
            gap: 1.5rem;
            &__title {
                @include heading_3;
            }
            &__price {
                @include df_fdc;
                gap: 1rem;
                @include text_1;
            }
            &__item {
                @include df_ac;
                gap: 3rem;
                .key {
                    color: $text-primary-transparent-48;
                    flex: 1;
                }
                .value {
                    flex: 1;
                }
            }
        }
        &__form {
            @include df_fdc;
            gap: 1.5rem;
            &__title {
                @include heading_3;
            }
            &__label-block {
                @include grid(2, 1rem);
                .field {
                    &:last-of-type {
                        grid-column: span 2;
                    }
                }
            }
        }
        &__radio-block {
            @include df_fdc;
            gap: 1rem;
        }
    }
</style>