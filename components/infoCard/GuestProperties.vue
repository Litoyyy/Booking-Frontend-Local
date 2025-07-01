<script lang="ts" setup>
    import InfoCard from '~/layouts/components/InfoCard.vue';

    const props = defineProps<{
    }>();
</script>

<template>
    <InfoCard 
    title="Заметки и указания" 
    size="basic">
        <div class="info-card__info-block">
            <div class="info-card__info-block__item">
                <ElementChip dot-color="#E68F6F">Запланировано на сегодня</ElementChip>
                <span class="value">0</span>
            </div>
            <hr>
            <div class="info-card__info-block__item">
                <ElementChip dot-color="#E66F6F">Просрочено</ElementChip>
                <span class="value">0</span>
            </div>
            <hr>
            <div class="info-card__info-block__item">
                <ElementChip dot-color="#901CAD">Запланировано на завтра</ElementChip>
                <span class="value">0</span>
            </div>
            <hr>
            <div class="info-card__info-block__item">
                <ElementChip dot-color="#1CAD64">Не запланировано</ElementChip>
                <span class="value">13/1</span>
            </div>
        </div>
    </InfoCard>
</template>

<style lang="scss" scoped>
    .info-card {
        &__info-block {
            @include df_fdc;
            gap: .5rem;
            &__item {
                @include df_ac;
                justify-content: space-between;
                .value {
                    @include text_2;
                    color: $text-primary-transparent-48;
                }
            }
            hr {
                border: none;
                border-top: 1px solid $border-primary-transparent-4;
            }
        }
    }
</style>