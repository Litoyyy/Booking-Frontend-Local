<script lang="ts" setup>
    definePageMeta({
        isAdmin: true,
    });
</script>

<template>
    <section>
        <div class="discount-create-section">
            <div class="discount-create-section__container container_admin">
                <div class="discount-create-section__form">
                    <div class="discount-create-section__form__info-block">
                        <div class="discount-create-section__form__info-block__title">
                            Общая информация
                        </div>
                        <div class="discount-create-section__form__inputs">
                            <ElementInput class="gc2"
                                id="discount-create-name-input"
                                fake-placeholder="Название"
                            />
                            <ElementInput
                                id="discount-create-size-input"
                                fake-placeholder="Размер"
                                name="size"
                                input-label-text="%"
                            />
                            <SelectDefault
                                id="discount-create-type-select"
                                fake-placeholder="Тип"
                            />
                        </div>
                    </div>
                    <div class="discount-create-section__form__info-block">
                        <div class="discount-create-section__form__info-block__title">
                            Период действия
                        </div>
                        <div class="discount-create-section__form__inputs">
                            <DatePicker range-select
                                id="discount-create-datepicker"
                                first-placeholder="С"
                                last-placeholder="По"
                            />
                        </div>
                    </div>
                    <div class="discount-create-section__form__info-block">
                        <div class="discount-create-section__form__info-block__title">
                            Условия
                        </div>
                        <div class="discount-create-section__form__inputs">
                            <SelectDefault
                                id="discount-create-availabilty-tariffs-select"
                                fake-placeholder="Доступно для тарифов"
                            />
                            <SelectDefault
                                id="discount-create-availabilty-rooms-select"
                                fake-placeholder="Доступно для номеров"
                            />
                            <SelectDefault class="gc2"
                                id="discount-create-availabilty-promos-select"
                                fake-placeholder="Доступно для промокодов"
                            />
                        </div>
                    </div>
                    <div class="discount-create-section__form__info-block">
                        <ElementCheckbox
                            id="discount-create-checkbox"
                        >Активна после создания
                        </ElementCheckbox>
                        <ElementButton
                            size="large"
                            name="button"
                        >Создать
                        </ElementButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .discount-create-section {
        &__form {
            grid-column: 2 / span 6;
            @include df_fdc;
            gap: 2rem;
            &__info-block {
                @include df_fdc;
                gap: 1.5rem;
                &__title {
                    @include heading_3;
                }
            }
            &__inputs {
                @include grid(2, 1rem);
                .gc2,
                .calendar-container {
                    grid-column: span 2;
                }
                .calendar-container__inputs {
                    gap: 1rem;
                }
            }
        }
    }
</style>