<script lang="ts" setup>

</script>
<template>
    <section class="home-section">
        <div class="home-section__container container">
            <!-- <div class="home-section__title">
                Добрый день<span v-if="res.first_name">, {{ res.first_name }}</span>!
            </div> -->
            <InfoCardIncome profit="1 017 800"
            booking="84"
            services="16"></InfoCardIncome>
            <Chart class="gc-8 gr-2"></Chart>
            <InfoCardCounter class="gc-2" 
            title="Уникальных гостей" 
            :count="87"></InfoCardCounter>
            <InfoCardCounter class="gc-2" 
            title="Категорий номеров" 
            :count="9"></InfoCardCounter>
            <InfoCardNotifications></InfoCardNotifications>
            <InfoCardTestimonials class="gc-8"></InfoCardTestimonials>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .home-section {
        padding: 1.5rem 3rem 3rem;
        &__container {
            margin: 0;
        }
        &__title {
            @include heading_1;
            grid-column: span 12;
        }
        .info-card {
            grid-column: span 4;
        }
        .gc-2 {
            grid-column: span 2;
        }
        .gc-8 {
            grid-column: span 8;
        }
        .gr-2 {
            grid-row: span 2;
        }
    }
</style>