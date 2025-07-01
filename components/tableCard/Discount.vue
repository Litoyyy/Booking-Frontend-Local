<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: Object
    }>();
</script>

<template>
    <TableCard>
        <div class="table-card__name">
            {{ res.title }}
        </div>
        <div class="table-card__info-block">
            <span>{{ res.size }}%</span>
            <span>{{ res.period }}</span>
            <span>{{ res.type }}</span>
        </div>
        <div class="table-card__tariff-block">
            <span>{{ res?.tariffs.length }} тариф{{ getWordEnding(res?.tariffs.length, ['', 'а', 'ов']) }}</span>
            <span>{{ res?.rooms.length }} номер{{ getWordEnding(res?.rooms.length, ['', 'а', 'ов']) }}</span>
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        .table-card__info-block,
        .table-card__tariff-block {
            @include df_fdc;
            color: $text-primary-transparent-48;
            @include text_1;
        }
    }
</style>