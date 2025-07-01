<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: Object,
    }>();
</script>

<template>
    <TableCard>
        <div class="table-card__name">
            {{ res.name }}
            <span>{{ res.small_name }}</span>
        </div>
        <div class="table-card__info-block">
            <div class="table-card__info-block__item">
                Доступно: 40
            </div>
            <div class="table-card__info-block__item">
                Мест: 2+1
            </div>
            <div class="table-card__info-block__item">
                Фото: 6
            </div>
            <div class="table-card__info-block__item">
                Оснащение:
                <ElementLink 
                color="transparent" 
                chevron="right"></ElementLink>
            </div>
        </div>
        <div class="table-card__price">
            от {{ res.base_price }} ₽
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        &__name {
            @include df_fdc;
            gap: .5rem;
            span {
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &__info-block {
            @include df_fdc;
            &__item {
                @include df_ac;
                gap: .5rem;
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &__price {
            @include heading_3;
        }
    }
</style>