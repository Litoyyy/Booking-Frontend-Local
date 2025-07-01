<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: Object
    }>();
</script>

<template>
    <TableCard>
        <template #icon_button><slot name="icon_button"/></template>
        <div class="table-card__name">
            {{ res.name }}
        </div>
        <!-- <div class="table-card__discount">
            <span>15%</span>
            <span>Общая</span>
        </div> -->
        <span>
            {{ res.description }}
        </span>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        &::v-deep(.table-card__name) {
            word-break: break-all;
        }
        &__discount {
            @include df_fdc;
            @include text_1;
            color: $text-primary-transparent-48;
        }
        span {
            @include text_1;
            color: $text-primary-transparent-48;
        }
    }
</style>