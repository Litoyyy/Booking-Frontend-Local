<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        profit?: string,
        booking?: string,
        services?: string
    }>();
</script>

<template>
    <InfoCard title="Доход" size="basic">
        <template #title>
            <ElementLink size="small" color="transparent">
                Этот месяц
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00042 8.78126L11.3003 5.48145L12.2431 6.42425L8.00042 10.6669L3.75781 6.42425L4.70062 5.48145L8.00042 8.78126Z" fill="#2D3033" fill-opacity="0.48"/>
                </svg>
            </ElementLink>
        </template>
        <div class="info-card__info-block">
            {{ profit }} ₽
            <div class="info-card__percentages-block">
                {{ booking }}% - бронирование
                <span>{{ services }}% - услуги</span>
            </div>
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        &__info-block {
            @include heading_0;
            color: $text-accent;
            @include df_fdc;
            gap: 1.5rem;
        }
        &__percentages-block {
            @include text_1;
            color: $text-primary;
            @include df_ac;
            gap: 1.5rem;
        }
    }
</style>