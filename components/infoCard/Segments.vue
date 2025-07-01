<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        filled?: boolean,
        rating?: number
    }>();
</script>

<template>
    <InfoCard title="Сегменты" size="basic">
        <div class="info-card__info-block">
            <ElementTag type="multiselect">
                Последний раз пришли с сайта
            </ElementTag>
            <ElementTag type="multiselect">
                Чаще приходят с сайта
            </ElementTag>
            <ElementTag type="multiselect">
                Негарантированная бронь
            </ElementTag>
        </div>
    </InfoCard>
</template>

<style lang="scss">
    .info-card {
        grid-column: span 3;
        &__info-block {
            display: flex;
            flex-wrap: wrap;
            gap: .5rem;
        }
    }
</style>