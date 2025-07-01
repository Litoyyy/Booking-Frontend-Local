<script lang="ts" setup>
import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Задать вопрос">
        <form class="popup__check-in-form">
            <DatePicker rangeSelect id="check-in-edit-calendar"></DatePicker>
            <SelectDefault></SelectDefault>
        </form>
        <ElementButton name="button" color="accent" size="large">
            Отправить
        </ElementButton>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__check-in-form {
            @include grid(2, 1px);
            .calendar-container {
                grid-column: span 2;
                &::v-deep(.calendar-container__inputs) {
                    gap: 1px;
                }
            }
            .select {
                grid-column: span 2;
            }

        }
    }
</style>