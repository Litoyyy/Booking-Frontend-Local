<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: Object
    }>();
</script>

<template>
    <TableCard>
        <template #header_title>
            <div class="table-card__name">
                {{ res.full_name }}
            </div>
        </template>
        <div class="table-card__contacts">
            <div class="table-card__contacts__item">
                <CopyToClipboard
                    :text="res.phone"
                />
            </div>
            <div class="table-card__contacts__item">
                <CopyToClipboard
                    :text="res.email"
                />
            </div>
        </div>
        <div class="table-card__status">
            <span>{{ res.date_birth }}</span>
            <span>Сегмент: {{ res.segment }}</span>
        </div>
        <div class="table-card__price">
            Доход: {{ res.income }} ₽
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        &__contacts {
            @include df_fdc;
            &__item {
                @include df_ac;
                gap: .5rem;
                @include text_1;
            }
        }
        &__status {
            @include df_fdc;
            span {
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &__price {
            @include text_1;
            color: $text-primary-transparent-48;
        }
    }
</style>