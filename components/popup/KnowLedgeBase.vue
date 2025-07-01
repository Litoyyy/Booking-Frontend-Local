<script lang="ts" setup>
import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="База знаний" resize fadeBottom>
        <div class="popup__filter-block">
            <ElementInput 
                placeholder="Поиск по базе…" 
                icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z" fill="#2D3033" fill-opacity="0.32"/></svg>'>
            </ElementInput>
            <div class="popup__filter-block__filters">
                <label for="knowledge-base-filter-1">
                    <input type="radio" id="knowledge-base-filter-1" name="knowledge_filter">
                    Все вопросы
                </label>
                <label for="knowledge-base-filter-2">
                    <input type="radio" id="knowledge-base-filter-2" name="knowledge_filter">
                    Работа с таблицами
                </label>
                <label for="knowledge-base-filter-3">
                    <input type="radio" id="knowledge-base-filter-3" name="knowledge_filter">
                    Про номера
                </label>
                <label for="knowledge-base-filter-4">
                    <input type="radio" id="knowledge-base-filter-4" name="knowledge_filter">
                    Про гостиницу
                </label>
                <label for="knowledge-base-filter-5">
                    <input type="radio" id="knowledge-base-filter-5" name="knowledge_filter">
                    Глубокий функционал модуля
                </label>
            </div>
        </div>
        <div class="popup__info-block custom-scrollbar">
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
            <Question name="Question-Name"
            link="Link"
            answer="Question-Answer"></Question>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        overflow-y: hidden;
        &::v-deep(.popup__header) {
            padding: 3rem 3rem 0;
        }
        &__filter-block {
            padding: 0 3rem;
            @include df_fdc;
            gap: 2rem;
            &__filters {
                display: flex;
                flex-wrap: wrap;
                gap: .75rem;
                label {
                    padding: .5rem;
                    border-radius: .5rem;
                    border: 1px solid $border-primary-transparent-8;
                    color: $text-accent;
                    @include strong_1;

                    cursor: pointer;
                    &:has(input:checked) {
                        border-color: $border-accent;
                    }
                    input {
                        display: none;
                    }
                }
            }
        }
        &__info-block {
            @include df_fdc;
            gap: 1rem;
            max-height: 40rem;
        }
    }
</style>