<script lang="ts" setup>
    import TableCard from '~/layouts/components/TableCard.vue';

    const props = defineProps<{
        res: Object,
        color?: 'main' | 'inherited',
    }>();
</script>

<template>
    <TableCard :color="props.color || 'main'" draggable>
        <div class="table-card__name">
            {{ res?.name }}
            <div class="table-card__name__info-block">
                {{ res?.source }}
                <span>{{ res?.period }}</span>
            </div>
        </div>
        <template #extra_button v-if="props.color !== 'inherited'">
            <ElementIconButton size="small" 
            color="transparent"
            :ghost="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1715 12.0007L8.22168 7.05093L9.6359 5.63672L15.9999 12.0007L9.6359 18.3646L8.22168 16.9504L13.1715 12.0007Z" fill="#2D3033" fill-opacity="0.48"/>
            </svg>
            </ElementIconButton>
        </template>
        <div class="table-card__promocode" v-if="res?.sum_with_promo_code">
            С промокодами
        </div>
        <div class="table-card__promocode" v-else>
            Без промокодов
        </div>
    </TableCard>
</template>

<style lang="scss" scoped>
    .table-card {
        &__name {
            @include df_fdc;
            gap: 1.5rem;
            &__info-block {
                @include df_fdc;
                @include text_1;
                color: $text-primary-transparent-48;
            }
        }
        &__promocode {
            @include text_1;
            color: $text-primary-transparent-48;
            padding-top: 1.5rem;
        }
        &[color="inherited"] {
            background-color: $bg-inverse-subdued-4;
            .table-card__promocode {
                padding-top: 0;
            }
        }
    }
</style>