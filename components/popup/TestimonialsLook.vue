<script lang="ts" setup>
import Popup from '~/layouts/components/Popup.vue';
</script>

<template>
    <Popup name="Отзывы о номере" resize fadeBottom>
        <div class="popup__filter-block">
            <ElementLink color="transparent">
                По дате
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.66699 7.99935H13.3337L8.00033 13.3327L2.66699 7.99935H7.33366V2.66602H8.66699V7.99935Z" fill="#2D3033"/>
                </svg>
            </ElementLink>
            <ElementLink color="transparent">
                По оценке
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.66699 7.99935H13.3337L8.00033 13.3327L2.66699 7.99935H7.33366V2.66602H8.66699V7.99935Z" fill="#2D3033"/>
                </svg>
            </ElementLink>
        </div>
        <div class="popup__info-block custom-scrollbar">
            <TestimonialCard type="popup"
            name="Анна"
            text="Прекрасный номер! Просторный и очень уютный. Кровать просто невероятная — я не могла оторваться от нее. В ванной комнате все было чисто и аккуратно. Обязательно вернусь!"
            date="28 окт, 14:16"
            :rating="5"></TestimonialCard>
            <TestimonialCard type="popup"
            name="Анна"
            text="Прекрасный номер! Просторный и очень уютный. Кровать просто невероятная — я не могла оторваться от нее. В ванной комнате все было чисто и аккуратно. Обязательно вернусь!"
            date="28 окт, 14:16"
            :rating="5"></TestimonialCard>
            <TestimonialCard type="popup"
            name="Анна"
            text="Прекрасный номер! Просторный и очень уютный. Кровать просто невероятная — я не могла оторваться от нее. В ванной комнате все было чисто и аккуратно. Обязательно вернусь!"
            date="28 окт, 14:16"
            :rating="5"></TestimonialCard>
            <TestimonialCard type="popup"
            name="Анна"
            text="Прекрасный номер! Просторный и очень уютный. Кровать просто невероятная — я не могла оторваться от нее. В ванной комнате все было чисто и аккуратно. Обязательно вернусь!"
            date="28 окт, 14:16"
            :rating="5"></TestimonialCard>
        </div>
    </Popup>
</template>

<style lang="scss" scoped>
    .popup {
        &__filter-block {
            @include df_ac;
            gap: 1.5rem;

            padding: 0 3rem;
        }
        &__info-block {
            @include df_fdc;
            gap: 2rem;

            max-height: 29rem;
            overflow-y: auto;
        }
    }
</style>