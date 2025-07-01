<script lang="ts" setup>
    import Popup from '~/layouts/components/Popup.vue';

    const props = defineProps<{
        res?: Array<any>
    }>();
</script>

<template>
    <Popup name="Выбрать гостя" headerType="subheader">
        <template #subheader_description>
            <ElementInput 
                placeholder="Поиск по ФИО, номеру телефона, e-mail…" 
                icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/></svg>'>
            </ElementInput>
            <div class="popup__subheader__filter-block">
                <div class="filter-item">
                    <div class="filter-item__key">
                        Сегмент:
                    </div>
                    <div class="filter-item__value">
                        <ElementLink chevron="right">Все</ElementLink>
                    </div>
                </div>
                <div class="filter-item">
                    <div class="filter-item__key">
                        Регион:
                    </div>
                    <div class="filter-item__value">
                        <ElementLink chevron="right">Все</ElementLink>
                    </div>
                </div>
                <div class="filter-item">
                    <div class="filter-item__key">
                        Дата рождения:
                    </div>
                    <div class="filter-item__value">
                        <ElementLink chevron="right">Все</ElementLink>
                    </div>
                </div>
                <ElementLink color="transparent">
                    Сбросить
                </ElementLink>
            </div>
        </template>
        <div class="popup__info-block custom-scrollbar">
            <GuestCard v-for="item in res"
            :res="item"
            state="offer"></GuestCard>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        gap: 0;
        &::v-deep(.popup__subheader) {
            padding: 3rem;
        }
        &__subheader {
            &__filter-block {
                @include df_ac;
                gap: 1.5rem;
                .filter-item {
                    @include df_ac;
                    gap: .5rem;
                    &__key {
                        @include text_1;
                        color: $text-primary-transparent-48;
                    }
                }
            }
        }
        &__info-block {
            @include grid(2, 1rem);
            max-height: 31.75rem;
            overflow-y: auto;
        }
    }
</style>