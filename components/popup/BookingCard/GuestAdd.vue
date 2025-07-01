<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';

    const props = defineProps<{
        edit?: boolean,
    }>();

    let representative = ref(false);

    const hasRepresentative = () => {
        const input = event?.target as HTMLInputElement;
        representative.value = input.checked ? true : false;
    }
</script>

<template>
    <Popup name="Доплатить за ранний заезд" fadeBottom :edit="props.edit">
        <template #header_description>
            <ElementLink color="subaccent">
                Выбрать гостя
            </ElementLink>
        </template>
        <div class="popup__info-block custom-scrollbar">
            <div class="popup__form">
                <div class="popup__form__info">
                    <div class="popup__form__info__title">
                        Общая информация
                    </div>
                    <div class="popup__form__label-block general">
                        <SelectDefault
                        fake-placeholder="Статус гостя"
                        id="booking-card-guest-add-guest-status"
                        name="status"></SelectDefault>
                        <ElementInput 
                        fake-placeholder="Комментарий"
                        id="booking-card-guest-add-comment"
                        name="comment"
                        helper="Виден только сотрудникам средства размещения"></ElementInput>
                    </div>
                </div>
                <hr>
                <div class="popup__form__info">
                    <div class="popup__form__info__title">
                        Личные и контактные данные
                    </div>
                    <div class="popup__form__label-block contacts">
                        <SelectDefault
                        fake-placeholder="Гражданство"
                        id="booking-card-guest-add-citizenship"
                        name="status"></SelectDefault>
                        <ElementInput 
                        fake-placeholder="Фамилия"
                        id="booking-card-guest-add-last-name"
                        name="first_name"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Имя"
                        id="booking-card-guest-add-first-name"
                        name="last_name"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Отчество"
                        id="booking-card-guest-add-sur-name"
                        name="surname"></ElementInput>
                        <DatePicker id="booking-card-guest-add-birthday"
                        name="birthday"
                        fake-placeholder="Дата рождения"></DatePicker>
                        <ElementInput 
                        fake-placeholder="Номер телефона"
                        id="booking-card-guest-add-phone"
                        name="phone"></ElementInput>
                        <ElementInput 
                        fake-placeholder="E-mail"
                        id="booking-card-guest-add-email"
                        name="email"></ElementInput>
                    </div>
                </div>
                <div class="popup__form__gender-block">
                    <ElementRadio id="booking-card-guest-add-male"
                    name="gender">М</ElementRadio>
                    <ElementRadio id="booking-card-guest-add-female"
                    name="gender">Ж</ElementRadio>
                </div>
                <ElementLink color="accent">
                    Укажите название компании и реквизиты
                </ElementLink>
                <div class="popup__edit-block" v-if="edit">
                    <hr>
                    <div class="popup__edit-block__documents">
                        <SelectDefault
                        fake-placeholder="Документ"
                        id="booking-card-guest-add-document"
                        name="document"></SelectDefault>
                        <SelectDefault
                        fake-placeholder="Страна рождения"
                        id="booking-card-guest-add-country"
                        name="country"></SelectDefault>
                        <ElementInput 
                        fake-placeholder="Регион"
                        id="booking-card-guest-add-region"
                        name="region"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Район"
                        id="booking-card-guest-add-district"
                        name="district"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Город"
                        id="booking-card-guest-add-city"
                        name="city"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Населенный пункт"
                        id="booking-card-guest-add-locality"
                        name="locality"></ElementInput>
                    </div>
                    <hr>
                    <div class="popup__edit-block__place">
                        <SelectDefault
                        fake-placeholder="Страна"
                        id="booking-card-guest-add-place-country"
                        name="country"></SelectDefault>
                        <ElementInput 
                        fake-placeholder="Регион"
                        id="booking-card-guest-add-place-region"
                        name="region"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Район"
                        id="booking-card-guest-add-place-district"
                        name="district"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Город"
                        id="booking-card-guest-add-place-city"
                        name="city"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Населенный пункт"
                        id="booking-card-guest-add-place-locality"
                        name="locality"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Улица"
                        id="booking-card-guest-add-place-street"
                        name="street"></ElementInput>
                        <ElementInput 
                        fake-placeholder="Дом"
                        id="booking-card-guest-add-place-house"
                        name="house"></ElementInput>
                        <ElementInput 
                        class="gc-2"
                        fake-placeholder="Корпус"
                        id="booking-card-guest-add-place-frame"
                        name="frame"></ElementInput>
                        <ElementInput 
                        class="gc-2"
                        fake-placeholder="Квартира"
                        id="booking-card-guest-add-place-apartments"
                        name="apartments"></ElementInput>
                        <ElementInput 
                        class="gc-2"
                        fake-placeholder="Почтовый индекс"
                        id="booking-card-guest-add-place-mail-index"
                        name="index"></ElementInput>
                    </div>
                    <ElementCheckbox id="booking-card-guest-add-place-legal-representative"
                    name="legal_representative"
                    @input="hasRepresentative">
                        Добавить законного представителя
                    </ElementCheckbox>
                    <Transition>
                        <div class="popup__edit-block__representative" v-if="representative">
                            <div class="popup__edit-block__representative__label-block">
                                <ElementInput 
                                fake-placeholder="Фамилия"
                                id="booking-card-guest-add-place-representative-last-name"
                                name="last_name"></ElementInput>
                                <ElementInput 
                                fake-placeholder="Имя"
                                id="booking-card-guest-add-place-representative-first-name"
                                name="first_name"></ElementInput>
                                <ElementInput 
                                fake-placeholder="Отчество"
                                id="booking-card-guest-add-place-representative-sur-name"
                                name="sur_name"></ElementInput>
                                <DatePicker id="booking-card-guest-add-place-representative-birhday"
                                first-placeholder="Дата рождения"></DatePicker>
                            </div>
                            <div class="popup__edit-block__representative__gender">
                                <ElementRadio id="booking-card-guest-add-place-legal-representative-male"
                                name="representative_gender">
                                    М
                                </ElementRadio>
                                <ElementRadio id="booking-card-guest-add-place-legal-representative-female"
                                name="representative_gender">
                                    Ж
                                </ElementRadio>
                            </div>
                            <div class="popup__edit-block__representative__label-block">
                                <SelectDefault
                                fake-placeholder="Страна рождения"
                                id="booking-card-guest-add-place-representative-country"
                                name="country"></SelectDefault>
                                <ElementInput 
                                fake-placeholder="Город рождения"
                                id="booking-card-guest-add-place-representative-city"
                                name="city"></ElementInput>
                                <SelectDefault
                                fake-placeholder="Гражданство"
                                id="booking-card-guest-add-place-representative-citizenship"
                                name="citizenship"></SelectDefault>
                                <SelectDefault
                                fake-placeholder="Степень родства"
                                id="booking-card-guest-add-place-representative-relationship"
                                name="relationship"></SelectDefault>
                                <SelectDefault
                                class="gc-2"
                                fake-placeholder="Паспорт"
                                id="booking-card-guest-add-place-representative-passport"
                                name="passport"></SelectDefault>
                                <ElementInput 
                                fake-placeholder="Серия"
                                id="booking-card-guest-add-place-representative-series"
                                name="series"></ElementInput>
                                <ElementInput 
                                fake-placeholder="Номер"
                                id="booking-card-guest-add-place-representative-number"
                                name="number"></ElementInput>
                                <DatePicker id="booking-card-guest-add-place-representative-date"
                                first-placeholder="Дата выдачи"></DatePicker>
                                <ElementInput 
                                fake-placeholder="Код подразделения"
                                id="booking-card-guest-add-place-representative-code"
                                name="code"></ElementInput>
                                <ElementInput 
                                class="gc-2"
                                fake-placeholder="Орган, выдавший документ"
                                id="booking-card-guest-add-place-representative-outstanding"
                                name="outstanding"></ElementInput>
                            </div>
                        </div>
                    </Transition>
                </div>
                <ElementButton size="large" v-if="!edit">
                    Добавить
                </ElementButton>
                <div class="popup__button-block" v-if="edit">
                    <ElementButton size="large">Редактировать</ElementButton>
                    <ElementButton size="large" color="transparent">Перейти в профиль гостя</ElementButton>
                </div>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__info-block {
            max-height: 50rem;
        }
        &__form {
            @include df_fdc;
            gap: 2rem;
            &__info {
                @include df_fdc;
                gap: 2rem;
                &__title {
                    @include heading_3;
                }
            }
            &__label-block {
                @include grid(2, 1rem);
                .select {
                    grid-column: span 2;
                }
                &.contacts {
                    .field {
                        &:first-of-type {
                            grid-column: span 2;
                        }
                    }
                }
                &.general {
                    .field {
                        grid-column: span 2;
                        &::v-deep(.field__helper) {
                            color: $text-primary-transparent-32;
                        }
                    }
                }
            }
            hr {
                border: 0;
                border-bottom: 1px solid $border-primary-transparent-8;
            }
            &__gender-block {
                @include df_ac;
                gap: 1rem;
            }
        }
        &__button-block {
            @include df_ac;
            gap: 1rem;
        }
        &__edit-block {
            @include df_fdc;
            gap: 2rem;
            .v-enter-active,
            .v-leave-active {
                transition: max-height 0.5s ease;
            }

            .v-enter-from,
            .v-leave-to {
                max-height: 0;
                overflow-y: hidden;
            }
            &__documents {
                @include grid(2, 1rem);
            }
            &__place {
                @include grid(6, 1rem);
                .select {
                    grid-column: span 6;
                }
                .field {
                    grid-column: span 3;
                    &.gc-2 {
                        grid-column: span 2;
                    }
                }
            }
            &__representative {
                @include df_fdc;
                gap: 2rem;
                max-height: 41.75rem;
                &__label-block {
                    @include grid(2, 1rem);
                    .field, 
                    .select {
                        &.gc-2 {
                            grid-column: span 2;
                        }
                    }
                }
                &__gender {
                    @include df_ac;
                    gap: 1rem;
                }
            }
        }
    }
</style>