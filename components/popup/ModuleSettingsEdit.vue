<script lang="ts" setup>
import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Настройки модуля" resize>
        <div class="popup__info-block">
            <div class="popup__info-block__item">
                <ElementCheckbox>
                    Показывать мотиватор «Посетители онлайн»
                </ElementCheckbox>
                <ElementPopover></ElementPopover>
            </div>
            <div class="popup__info-block__item">
                <ElementCheckbox>
                    Показывать мотиватор «Посетители онлайн»
                </ElementCheckbox>
                <ElementPopover></ElementPopover>
            </div>
            <div class="popup__info-block__item">
                <ElementCheckbox>
                    Показывать мотиватор «Посетители онлайн»
                </ElementCheckbox>
                <ElementPopover></ElementPopover>
            </div>
            <div class="popup__info-block__item">
                <ElementCheckbox>
                    Показывать мотиватор «Посетители онлайн»
                </ElementCheckbox>
                <ElementPopover></ElementPopover>
            </div>
        </div>
        <div class="popup__category-block">
            <SelectDefault></SelectDefault>
            <ElementPopover></ElementPopover>
        </div>
        <div class="popup__pay-method">
            <SelectDefault></SelectDefault>
            <ElementPopover></ElementPopover>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__info-block {
            @include df_fdc;
            gap: .75rem;
            &__item {
                @include df_ac;
                gap: .25rem;
            }
        }
        &__category-block {
            @include df_ac;
            gap: .5rem;
            .select {
                width: 100%;
            }
        }
        &__pay-method {
            @include df_ac;
            gap: .5rem;
            .select {
                width: 100%;
            }
        }
    }
</style>