<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        filled?: boolean,
        res?: Object,
        rating?: 1 | 2 | 3 | 4 | 5
    }>();
</script>

<template>
    <InfoCard title="Оценки" size="basic">
        <template #title>
            <span>{{ rating }}</span>
        </template>
        <div class="info-card__info-block custom-scrollbar" v-if="filled">
            <TestimonialCard v-for="item in res" 
            type="personal" 
            ></TestimonialCard>
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        flex-direction: row;
        gap: 3rem;
        padding-right: .5rem;
        min-height: 18.25rem;
        :deep(.info-card__title) {
            @include df_fdc;
            justify-content: unset;
            align-items: flex-start;
            gap: 1.5rem;
            span {
                @include heading_1;
                color: $text-subaccent;
            }
        }
        &__info-block {
            @include df_fdc;
            gap: .75rem;
            max-height: 16.75rem;
            overflow-y: auto;
            padding-right: .5rem;
        }
    }
</style>