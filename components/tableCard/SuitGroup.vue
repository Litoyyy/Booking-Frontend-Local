<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';


    const props = defineProps<{
        res: Object,
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
        <div class="table-card__info-block">
            <span>Номера</span>
            <slot name="rooms"/>
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        &__info-block {
            @include df_ac;
            gap: .5rem;
            span {
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
    }
</style>