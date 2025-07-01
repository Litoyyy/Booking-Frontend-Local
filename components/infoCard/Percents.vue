<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        percents?: number,
        busy?: number,
        total?: number,
    }>();
</script>

<template>
    <InfoCard 
    title="Загрузка на сегодня" 
    size="basic">
        <template #title>
            <ElementPopover></ElementPopover>
        </template>
        <div class="info-card__info-block">
            {{ percents }}%
            <span>Занято номеров {{ busy }} из {{ total }}</span>
        </div>
        <ElementLink 
        color="accent" 
        size="small">
            Свободные номера
        </ElementLink>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        gap: 2rem;
        &__info-block {
            @include df_fdc;
            @include heading_0;
            color: $text-accent;
            span {
                @include text_2;
                color: $text-primary-transparent-48;
            }
        }
    }
</style>