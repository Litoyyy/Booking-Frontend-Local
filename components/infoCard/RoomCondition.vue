<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{

    }>();
</script>

<template>
    <InfoCard 
    title="Состояние номеров" 
    size="basic">
        <template #title>
            <ElementPopover></ElementPopover>
        </template>
        <div class="info-card__info-block">
            <div class="info-card__info-block__card">
                Грязно
                <span>0</span>
            </div>
            <div class="info-card__info-block__card">
                Убрано
                <span>0</span>
            </div>
            <div class="info-card__info-block__card" state="active">
                Проверено
                <span>20</span>
            </div>
            <div class="info-card__info-block__card">
                Ремонт
                <span>0</span>
            </div>
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        grid-column: span 4;
        &__info-block {
            @include df_ac;
            gap: .5rem;
            &__card {
                flex: 1;
                @include df_jb_fdc;
                height: 9rem;
                background-color: $bg-primary;
                padding: .75rem;
                @include text_2;
                span {
                    @include heading_1;
                    color: $text-primary-transparent-16;
                }
                &[state="active"] {
                    span {
                        color: $text-system-positive;
                    }
                }
            }
        }
    }
</style>