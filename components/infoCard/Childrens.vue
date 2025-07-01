<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
        
    }>();
</script>

<template>
    <InfoCard title="Дети" size="basic">
        <template #title>
            <ElementIconButton size="micro" color="transparent-secondary" :ghost="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.1665 9.16699V4.16699H10.8332V9.16699H15.8332V10.8337H10.8332V15.8337H9.1665V10.8337H4.1665V9.16699H9.1665Z" fill="#2D3033" fill-opacity="0.32"/>
                </svg>
            </ElementIconButton>
        </template>
        <div class="info-card__info-block">
            <span>Панченко Дмитрий Анатольевич</span>
            <span>Панченко Оксана Анатольевна</span>
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        justify-content: space-between;
        overflow: hidden;
        :deep(.info-card__title) {
            @include df_ac;
            justify-content: flex-start;
            gap: .25rem;
        }
        &__info-block {
            @include df_fdc;
            span {
                @include text_1;
            }
        }
    }
</style>