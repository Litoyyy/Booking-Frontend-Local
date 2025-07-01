<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: object
    }>();
</script>

<template>
    <TableCard>
        <div class="table-card__name">
            Сильвер
        </div>
        <div class="table-card__service">
            <span>Питание</span>
            <span>За гостя в сутки</span>
        </div>
        <div class="table-card__info-block">
            <span>2 тарифа</span>
            <span>3 фото</span>
        </div>
        <div class="table-card__compound">
            <span>Шведский стол</span>
            <span>Модуль BM, Yandex</span>
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        .table-card__service,
        .table-card__info-block,
        .table-card__compound {
            @include df_fdc;
            @include text_1;
            color: $text-primary-transparent-48;
        }
    }
</style>