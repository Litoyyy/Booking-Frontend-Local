<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Создать скидку">
        <form class="popup__discount-form">
            <div class="popup__discount-form__info">
                <div class="popup__discount-form__name">
                    Общая информация
                </div>
                <div class="popup__discount-form__info__labels">
                    <ElementInput 
                        fake-placeholder="Название" 
                        name="discount_name" 
                        id="discount_name"></ElementInput>
                    <ElementInput 
                        fake-placeholder="Размер" 
                        name="discount_size" 
                        id="discount_size"
                        inputLabelText="%"></ElementInput>
                    <SelectDefault
                        placeholder="Тип"
                    ></SelectDefault>
                </div>
            </div>
            <div class="popup__discount-form__info">
                <div class="popup__discount-form__name">
                    Период действия
                </div>
                <div class="popup__discount-form__info__labels period">
                    <DatePicker rangeSelect
                        firstPlaceholder="C"
                        lastPlaceholder="По"
                    ></DatePicker>
                </div>
            </div>
            <div class="popup__discount-form__info">
                <div class="popup__discount-form__name">
                    Условия
                </div>
                <div class="popup__discount-form__info__labels conditions">
                    <SelectDefault
                        placeholder="Доступно для тарифов"
                    ></SelectDefault>
                    <SelectDefault
                        placeholder="Доступно для номеров"
                    ></SelectDefault>
                    <SelectDefault
                        placeholder="Доступно для промокодов"
                    ></SelectDefault>
                </div>
            </div>
            <div class="popup__button-block">
                <ElementCheckbox>
                    Активна после создания
                </ElementCheckbox>
                <ElementButton size="large" name="button">
                    Создать
                </ElementButton>
            </div>
        </form>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__discount-form {
            @include df_fdc;
            gap: 2rem;
            &__name {
                @include heading_3;
            }
            &__info {
                @include df_fdc;
                gap: 1.5rem;
                &__labels {
                    @include grid(2, 1rem);
                    .field {
                        &:first-of-type {
                            grid-column: span 2;
                        }
                    }
                    &.period {
                        @include df_ac;
                        .calendar-container {
                            width: 100%;
                        }
                    }
                    &.conditions {
                        .select {
                            &:last-of-type {
                                grid-column: span 2;
                            }
                        }
                    }
                }
            }
        }
        &__button-block {
            @include df_fdc;
            gap: 1.5rem;
            ::v-deep(.custom-checkbox-label input) {
                width: auto;
            }
        }
    }
</style>