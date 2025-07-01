<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: Object
    }>();
</script>

<template>
    <TableCard>
        <template #icon_button>
            <slot name="icon_button" />
        </template>
        <div class="table-card__name">
            {{ res.name }}
        </div>
        <span>4 услуги</span>
        <span>
            {{ res.description ?? 'Без описания' }}   
        </span>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        span {
            @include text_1;
            color: $text-primary-transparent-48;
        }
    }
</style>