<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Переселить в бронировании" description="№ брони 20241120-1524-308251917">
        <form class="popup__form">
            <div class="popup__form__label-block">
                <SelectDefault id="gantt-booking-relocation-category" 
                name="room_category"
                fake-placeholder="Категория комнаты"></SelectDefault>
                <SelectDefault id="gantt-booking-relocation-room-number" 
                name="room_number"
                fake-placeholder="Номер комнаты"></SelectDefault>
                <DatePicker id="gantt-booking-relocation-date" 
                name="date"
                fake-placeholder="Даты проживания"></DatePicker>
            </div>
            <ElementCheckbox id="gantt-booking-relocation-checkbox">Не изменять цену на проживание</ElementCheckbox>
        </form>
        <div class="popup__price-block">
            <div class="popup__price-block__price">
                <div class="key">
                    Прежняя стоимость
                </div>
                <div class="value">
                    18 900
                </div>
            </div>
            <div class="popup__price-block__base-price">
                <div class="key">
                    Новая стоимость
                </div>
                <div class="value">
                    22 900
                </div>
            </div>
        </div>
        <ElementButton size="large" name="button">
            Переселить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &::v-deep(.popup__header__description) {
            color: $text-primary-transparent-48;
        }
        &__form {
            @include df_fdc;
            gap: 2rem;
            &__label-block {
                @include grid(2, 1rem);
                .calendar-container {
                    grid-column: span 2;
                }
            }
        }
        &__price-block {
            @include df_fdc;
            gap: 1rem;
            &__price,
            &__base-price {
                @include df_ac;
                gap: 3rem;
                .key, .value {
                    flex: 1;
                }
            }
            &__price {
                @include text_1;
                .key {
                    color: $text-primary-transparent-48;
                }
            }
            &__base-price {
                @include heading_2;
            }
        }
    }
</style>