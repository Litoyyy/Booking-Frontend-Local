<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
    }>();
</script>

<template>
    <TableCard draggable>
        <div class="table-card__name">
            Эквайринг BookingModule
            <span>Банк.карта РФ, Кешбэк МИР</span>
        </div>
        <div class="table-card__info">
            <span>7 тарифов</span>
            <span>Без предоплаты</span>
        </div>
        <span>
            Заезд всегда
        </span>
        <div class="table-card__more">
            <span>Отмена разрешена</span>
            Подробнее
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        &__name {
            @include df_fdc;
            gap: .25rem;
            span {
                color: $text-primary-transparent-48;
            }
        }
        &__info {
            @include text_1;
            color: $text-primary-transparent-48;
        }
        span {
            @include text_1;
            color: $text-primary-transparent-48;
        }
        &__more {
            @include text_1;
            span {
                color: $text-primary-transparent-48;
            }
        }
    }
</style>